import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
   {
      path:'add',
      component : AddComponent
   },
   {
    path: 'edit/:id',
    component: AddComponent,
    data: {title: 'edit'},
   },
   {
     path:'view',
     component:ViewComponent
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
