import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { SubjectService } from '../../providers/subject/subject.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  subjectData: any;
  token: any;
  constructor(
    private router: Router,
    private subjectService:SubjectService
  ) 
  {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void{
    this.get_subjectdata()
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

  deletesubject(listid:any)
  {
    var mylist = {id:listid};
    this.subjectService.deletesubject(mylist).subscribe(
      (response)=> {
        if (response.code == 200) 
        { 
          this.router.navigate(['/subject/view']);
        }
      },
    );
  }

}
