import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import {UserService} from '../../providers/user/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userData: any;
  viewrole:any;
  constructor(
    private userService : UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.viewrole = 'student';
    this.get_userdata();
  }

  get_userdata()
  {
    this.userService.getUserDetails({},this.viewrole).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            this.userData = response.result;   
          }
        },
      );
  }

  deletelistuser(listid:any)
  {
    var mylist = {id:listid};
    this.userService.deletelistuser(mylist).subscribe(
      (response)=> {
        if (response.code == 200) 
        {
          this.router.navigate(['/auth/user']);
        }
      },
    );
  }

}
