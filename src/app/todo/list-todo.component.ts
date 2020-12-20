import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TodoService } from '@app/_services/todo.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
})
export class ListTodoComponent implements OnInit {
  isChecked:boolean=false;
  thisTodo:string;
  todolist = null;
  user: User;
  todoDisable:Array<string>=[];

  constructor(private todoService: TodoService,private accountService: AccountService) {
    this.user = this.accountService.userValue;

   }

  ngOnInit(): void {
    this.todoService.getAll()
    .pipe(first())
    .subscribe(todolist => this.todolist = todolist);
}

deleteTodo(id: string) {
const todo = this.todolist.find(x => x._id === id);
todo.isDeleting = true;
this.todoService.delete(todo._id)
    .pipe(first())
    .subscribe(() => {
        this.todolist = this.todolist.filter(x => x._id !== id) 
    });
}
searchedKeyword: string;


setAll(checked:boolean,todoId){
this.isChecked=!this.isChecked;
if(this.isChecked){
  console.log("Array: "+this.todoDisable)
  if(this.todoDisable.includes(todoId)){
    this.thisTodo=null;
  }
  else{
    this.thisTodo=todoId;
    this.todoDisable.push(todoId);
  }
}
}
}


