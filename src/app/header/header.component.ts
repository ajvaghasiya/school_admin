import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import {UserService} from '../providers/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: any;
  userData: any;
  constructor(
    private userService : UserService,
    private router: Router,
  ) 
  {
    this.token = localStorage.getItem('token');
    
    this.router.events.subscribe((val) => {
      this.get_userdata();
    })
  }

  ngOnInit(): void {

  }
  ;  
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/auth/login']); 
  }
  
  
  get_userdata()
  {
    this.userService.getprofileData({token:this.token}).subscribe(
        (response)=> {
          if (response.code == 200) 
          { 
            this.userData = response.result;
          }
        },
      );
  }

}
