import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add-user componets
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

import {AuthGuard} from '../guard/auth.guard';

const routes: Routes = [

  // Add-user
  { 
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'edit-user/:id',
    component: AddUserComponent,
    data: {title: 'edit-user'},
  },
  {  path: 'user',
    component: ViewUserComponent,
  },
  { 
    path: 'teacher-list',
    component: ViewTeacherComponent,
  },
  { 
    path: 'admin-list',
    component: ViewAdminComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
