import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { User } from '@app/_models/user';

@Component({selector: 'app-list', templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    user: User;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.user = this.accountService.userValue;
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x._id === id);
        user.isDeleting = true;
        this.accountService.delete(user._id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x._id !== id) 
            });
    }
}