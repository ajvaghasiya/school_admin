import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ClassService } from '../../providers/class/class.service';
import { SubjectService } from '../../providers/subject/subject.service';
import {UserService} from '../../providers/user/user.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  addClassForm:FormGroup;
  submitted: boolean = false;
  token: any;
  subjectData: any;
  studentrole:any;
  studentData: any;
  id:any;
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  applyAction: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private classService:ClassService,
    private subjectService:SubjectService,
    private userService : UserService,
  )
  { 
    this.token = localStorage.getItem('token');
    this.addClassForm = this.formBuilder.group({
      class_name: ['',Validators.required],
      subject: ['',Validators.required],
      student: ['',Validators.required],
      status: ['',Validators.required],
     });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addClassForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.studentrole = 'student';
    this.get_subjectdata();
    this.get_studentdata();
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

  patchingdata(id:any) {
    let obj = {id:id};
    this.classService.getclassWithId(obj).subscribe(
      (response) => {
        if (response.body.code == 200) {
          let data = response?.body.result;
          this.addClassForm.patchValue({
            class_name: data?.name,
            subject: data?.subject,
            student: data?.student,
            status: data?.status,
          });
       }else{
          
        }
      },
    );
  }

  get_subjectdata()
  {
    this.subjectService.getsubjectDetails({token:this.token}).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            this.subjectData = response.result;   
          }
        },
      );
  }

  get_studentdata()
  {
    this.userService.getUserDetails({},this.studentrole).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            this.studentData = response.result;   
          }
        },
      );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addClassForm.value;
    let id  = this.id;
    if (this.addClassForm.invalid){
      return;
    }
    if (!this.isEdit)
    {
    this.classService.addClass(obj).subscribe(
      (response) => {
        if(response.body.code == 200) 
        { 
          this.router.navigate(['/class/view']); 
        }else if(response.body.code == 400) 
        {   
          
        } 
      },
    );
   }
   else
   {
    this.classService.editclassdata(obj,id).subscribe(
      (response) => {
        if(response.code == 200) 
        {
          this.router.navigate(['/class/view']);  
        } 
      },
    );
   }
  }
}
