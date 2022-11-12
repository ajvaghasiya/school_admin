import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

@NgModule({
  declarations: [
    AddUserComponent,
    LoginComponent,
    ViewUserComponent,
    ViewTeacherComponent,
    ViewAdminComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
