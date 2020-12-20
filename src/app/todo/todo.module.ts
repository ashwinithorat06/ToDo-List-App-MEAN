import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { TodoRoutingModule } from './todo-routing.module'
import { AddEditTodoComponent } from './add-edit-todo.component';;
import { LayoutTodoComponent } from './layout-todo.component';
import { ListTodoComponent } from './list-todo.component';

import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';


@NgModule({
  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatCheckboxModule
  ],
  declarations: [ 
    AddEditTodoComponent,
    LayoutTodoComponent ,
    ListTodoComponent],
})
export class TodoModule { }
