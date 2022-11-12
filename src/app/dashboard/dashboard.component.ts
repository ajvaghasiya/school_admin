import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { DashboardService } from '../providers/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token: any;
  subject_count:any;
  class_count:any;
  exam_count:any; 
  constructor(
    private router: Router,
    private dashboardService:DashboardService,
  ) 
  {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.dashboard_data()
  }

  dashboard_data()
  {
    this.dashboardService.getboardDetails({token:this.token}).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
             this.subject_count = response.count_subject;
             this.class_count   = response.count_class;
             this.exam_count    = response.count_exam;
          }
        },
      );
  }

}
