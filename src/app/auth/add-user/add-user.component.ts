import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import{AddUserService} from '../../providers/auth/add-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm:FormGroup;
  submitted: boolean = false;
  existemail: boolean = false;
  id:any;
  mrole:any;
  isEdit = this.route.snapshot.data.title === 'edit-user' ? true : false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private addUserService: AddUserService,
  )
  {  
    this.addUserForm = this.formBuilder.group({
      name: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      role: ['student',Validators.required],
      gender: ['male',Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) 
    {
      this.patchingdata(this.id);
    }
  }
 
  patchingdata(id:any) {
    let obj = {id:id};
    this.addUserService.getdataWithId(obj).subscribe(
      (response) => {
        if (response.body.code == 200) {
          let data = response?.body.result;
          this.addUserForm.patchValue({
            name: data?.name,
            lastname: data?.lastname,
            email: data?.email,
            role: data?.role,
            gender: data?.gender,
          });
          this.mrole = data?.role;
        }else {
          
        }
      },
    );
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.addUserForm.controls[controlName].hasError(errorName);
  };

  onSubmit()
  {
    this.submitted = true;
    let obj = this.addUserForm.value;
    let id  = this.id;
    if (this.addUserForm.invalid) {
      return;
    }

    if (!this.isEdit)
    {
      this.addUserService.addUser(obj).subscribe(
        (response) => {
          if(response.body.code == 200) 
          { 
             if(response.body.redirection == 'student'){
                this.router.navigate(['/auth/user']); 
            }else if(response.body.redirection == 'teacher'){
                this.router.navigate(['/auth/teacher-list']); 
            }else{
                this.router.navigate(['/auth/admin-list']); 
            }
          }else if(response.body.code == 400) 
          {   
            this.existemail = true;
          } 
        },
      );
    }
    else
    {
      this.addUserService.editUserdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {  if(response.redirection == 'student'){
                this.router.navigate(['/auth/user']); 
             }else if(response.redirection == 'teacher'){
                 this.router.navigate(['/auth/teacher-list']); 
             }else{
                this.router.navigate(['/auth/admin-list']); 
             }
          } 
        },
      );
    }
  }

}
