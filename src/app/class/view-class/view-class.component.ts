import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ClassService } from '../../providers/class/class.service';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {
  classData: any;
  token: any;
  constructor(
    private router: Router,
    private classService:ClassService,
  )
  {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.get_classdata()
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

  deleteclass(listid:any)
  {
    var mylist = {id:listid};
    this.classService.deleteclass(mylist).subscribe(
      (response)=> {
        if (response.code == 200) 
        { 
          this.router.navigate(['/class/view']);
        }
      },
    );
  }

  

}
