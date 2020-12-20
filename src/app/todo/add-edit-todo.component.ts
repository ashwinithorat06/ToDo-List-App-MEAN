import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  AlertService, AccountService } from '@app/_services';
import { TodoService } from '@app/_services/todo.service';
import { User } from '@app/_models/user';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
})
export class AddEditTodoComponent implements OnInit {
// textArea:string;
  priorities: string[] = ['Low', 'Medium', 'High'];
  categories:string[];

    user: User;
    form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private todoService:TodoService,
        private accountService:AccountService,
        private alertService: AlertService
  ) { }

  ngOnInit(): void {
      
  this.categories=[
    'Birthday',
    'Shopping',
    'Study',
    'Meeting',
    'others'
  ]

    this.user = this.accountService.userValue;
    this.id = this.route.snapshot.params['id'];
    // console.log("this.user:" +this.user._id);
    // console.log("this.id:"+ this.id);
    this.isAddMode = !this.id;
    
    
    this.form = this.formBuilder.group({
        taskName: ['', Validators.required],
        category: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        textArea: ['', Validators.required],
        priority: ['', Validators.required],
        userId:this.user._id},
        {validator: this.dateLessThan('startDate', 'endDate')},
        );


    if (!this.isAddMode) {
        this.todoService.getById(this.id)
            .pipe(first())
            .subscribe(x => {
                this.f.taskName.setValue(x.taskName);
                this.f.category.setValue(x.category);
                this.f.startDate.setValue(x.startDate);
                this.f.endDate.setValue(x.endDate);
                this.f.textArea.setValue(x.textArea);
                this.f.priority.setValue(x.priority);
            });
    }
}
dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];
     if( (f.value > t.value) && (t.value !="") ){
        this.alertService.error("End date should be greater than Start date");
        return {
         dates: "Start date should be less than End date"
       };
     }
     return {};
    }
  }

// convenience getter for easy access to form fields
get f() { return this.form.controls; }

onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createTodo();
    } else {
        this.updateTodo();
    }
}

private createTodo() {
    this.todoService.register(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Todo added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['.', { relativeTo: this.route }]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

private updateTodo() {
    this.todoService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Todo Update successful', { keepAfterRouteChange: true });
                this.router.navigate(['..', { relativeTo: this.route }]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
