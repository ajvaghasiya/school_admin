import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';

import { ExamRoutingModule } from './exam-routing.module';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ViewExamComponent } from './view-exam/view-exam.component';


@NgModule({
  declarations: [
    AddExamComponent,
    ViewExamComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExamRoutingModule,
    HttpClientModule,
    NgxUploaderModule
  ]
})
export class ExamModule { }
