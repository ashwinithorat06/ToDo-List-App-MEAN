import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { todoform } from '../_models/todoform';
import { User } from '@app/_models';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

 
  constructor(
    private router: Router,
    private http: HttpClient

  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }
   public get userValue(): User {
    return this.userSubject.value;
}
getAll() {
  return this.http.get<todoform[]>(`${environment.apiUrl}/users/${this.userValue._id}/todo`);
}
register(todo: todoform) {
  return this.http.post(`${environment.apiUrl}/users/${this.userValue._id}/todo/register`, todo);
}

getById(id: string) {
  return this.http.get<todoform>(`${environment.apiUrl}/users/${this.userValue._id}/todo/${id}`);
}
update(id, params) {
  return this.http.put(`${environment.apiUrl}/users/${this.userValue._id}/todo/${id}`, params)
      .pipe(map(x => {
        // if(this.userValue._id){
        //   const user = { ...this.userValue, ...params };
        //   localStorage.setItem('user', JSON.stringify(user));

        //   // publish updated user to subscribers
        //   this.userSubject.next(user);
        // }
          return x;
      }));
}
delete(id: string) {
  console.log(`${environment.apiUrl}/users/${this.userValue._id}/todo/${id}`)
  return this.http.delete(`${environment.apiUrl}/users/${this.userValue._id}/todo/${id}`)
      .pipe(map(x => {
       
      return x;
      }));
}
}
