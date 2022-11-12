import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeachersComponent } from './add-teachers/add-teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NodataComponent } from './nodata/nodata.component';
import { TeachersComponent } from './teachers/teachers.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren:() => import("./auth/auth.module").then((m) => m.AuthModule),
    data: { title: 'Auth Module' },
  },
  {
    path: 'subject',
    loadChildren:() => import("./subject/subject.module").then((m) => m.SubjectModule),
    data: { title: 'Subject Module' },
  },
  {
    path: 'class',
    loadChildren:() => import("./class/class.module").then((m) => m.ClassModule),
    data: { title: 'Class Module' },
  },
  {
    path: 'exam', 
    loadChildren:() => import("./exam/exam.module").then((m) => m.ExamModule),
    data: { title: 'Exam Module' },
  },
  {
    path: '',
    component:DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'add-teachers',
    component:AddTeachersComponent
  },
  {
    path:'teachers',
    component:TeachersComponent
  }, 
  {
    path:'**',
    component:NodataComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
