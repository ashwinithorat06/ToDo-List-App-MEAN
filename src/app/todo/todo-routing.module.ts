import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutTodoComponent } from './layout-todo.component';
import { ListTodoComponent } from './list-todo.component';
import { AddEditTodoComponent } from './add-edit-todo.component';

const routes:Routes=[
  {
    path:'',component:LayoutTodoComponent,
    children:[
      { path:'',component:ListTodoComponent},
      { path:'add',component:AddEditTodoComponent},
      { path:'edit/:id',component:AddEditTodoComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TodoRoutingModule { }
