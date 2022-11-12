import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// SERVICES
import {LoginService} from '../../providers/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  showmsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
  )
  {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }
  
  onSubmit()
  {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loginService.validateLogin(this.loginForm.value).subscribe(
      (response) => {
        if (response.body.code == 200) 
        {
          localStorage.setItem('token', response.body.token);
          this.router.navigate(['/']); 
        }
        else if(response.body.code == 400)
        {
          this.showmsg = 'wrong authentication'; 
        } 
      },
    );

  }

}
