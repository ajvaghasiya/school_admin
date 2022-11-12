import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddClassComponent } from './add-class/add-class.component';
import { ViewClassComponent } from './view-class/view-class.component';

const routes: Routes = [
  {
    path:'add',
    component : AddClassComponent
 },
 {
  path: 'edit/:id',
  component: AddClassComponent,
  data: {title: 'edit'},
 },
 {
   path:'view',
   component:ViewClassComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
