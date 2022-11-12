import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { SubjectService } from '../../providers/subject/subject.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addSubjectForm:FormGroup;
  submitted: boolean = false;
  teacherData:any;
  viewrole:any;
  subjectexist:any;
  id:any;
  action_role:any;
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private subjectService:SubjectService
  ){ 
    this.addSubjectForm = this.formBuilder.group({
      name: ['',Validators.required],
      teacher: ['',Validators.required],
      status: ['',Validators.required],
     });
     this.viewrole = 'teacher';
     this.get_teacherdata();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSubjectForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) 
    {
      this.patchingdata(this.id);
    }
  }

  patchingdata(id:any) {
    let obj = {id:id};
    this.subjectService.getsubjectWithId(obj).subscribe(
      (response) => {
        if (response.body.code == 200) {
          let data = response?.body.result;
          this.addSubjectForm.patchValue({
            name: data?.name,
            teacher: data?.teacher,
            status: data?.status,
          });
       }else{
          
        }
      },
    );
  }

  get_teacherdata()
  {  
    this.subjectService.getTeacherDetails({},this.viewrole).subscribe((response)=> {
          if (response.code == 200) 
          {   
             this.teacherData = response.result;   
          }
        },
      );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addSubjectForm.value;
    let id  = this.id;
    if (this.addSubjectForm.invalid) {
      return;
    }
    if (!this.isEdit)
    {
      this.subjectService.addSubject(obj).subscribe(
        (response) => {
          if(response.body.code == 200) 
          { 
            this.router.navigate(['/subject/view']); 
          }else if(response.body.code == 400) 
          {   
            this.subjectexist = response.body.message;
          } 
        },
      );
    }
    else
    {
      this.subjectService.editsubjectdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            this.router.navigate(['/subject/view']);  
          } 
        },
      );
    }
    
  }

}
