import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubjectRoutingModule } from './subject-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    AddComponent,
    ViewComponent
  ],
  imports: [
     SubjectRoutingModule,
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule
  ]
})
export class SubjectModule { }
