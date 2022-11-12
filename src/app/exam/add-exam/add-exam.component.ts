import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
//import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import {ExamService} from '../../providers/exam/exam.service';
import { ClassService } from '../../providers/class/class.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;

  addExamForm:FormGroup;
  submitted: boolean = false;
  classData: any;
  id:any;
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  applyAction: any;
  token: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private examService:ExamService,
    private classService:ClassService,
  )
  {
    this.addExamForm = this.formBuilder.group({
      name: ['',Validators.required],
      exam_date: ['',Validators.required],
      status: ['',Validators.required],
     });
    this.token = localStorage.getItem('token');
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addExamForm.controls[controlName].hasError(errorName);
  };


  ngOnInit(): void {
    this.get_classdata();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) 
    {
      this.patchingdata(this.id);
      this.applyAction = 'Update';
    }
    else
    {
      this.applyAction = 'Add';
    }
  }

  get_classdata()
  {
    this.classService.getclassDetails({token:this.token}).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            this.classData = response.result;   
          }
        },
      );
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue')
    {
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://localhost:1992/api/exam/uploadresultdata',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event); 
    }
    else
    {

    }
  }

  patchingdata(id:any) {
    let obj = {id:id};
    this.examService.getexamWithId(obj).subscribe(
      (response) => {
        if (response.body.code == 200) {
          let data = response?.body.result;
          this.addExamForm.patchValue({
            name: data?.name,
            exam_date: data?.exam_date,
            status: data?.status,
          });
       }else{
          
        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addExamForm.value;
    let id  = this.id;
    if (this.addExamForm.invalid){
      return;
    }
    if (!this.isEdit)
    {
      this.examService.addExam(obj).subscribe(
        (response) => {
          if(response.body.code == 200) 
          { 
            this.router.navigate(['/exam/view']); 
          }else if(response.body.code == 400) 
          {   
            
          } 
        },
      );
    }
    else
    {
      this.examService.editexamdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            this.router.navigate(['/exam/view']);  
          } 
        },
      );
    }
  }
}
