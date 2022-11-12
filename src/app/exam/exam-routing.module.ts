import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddExamComponent } from './add-exam/add-exam.component';
import { ViewExamComponent } from './view-exam/view-exam.component';

const routes: Routes = [
 {
    path:'add',
    component : AddExamComponent
 },
 {
  path: 'edit/:id',
  component: AddExamComponent,
  data: {title: 'edit'},
 },
 {
   path:'view',
   component:ViewExamComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
