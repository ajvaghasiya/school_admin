import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Services
import {ExamService} from '../../providers/exam/exam.service';
//import jQuery = require('jquery');
//import * as $ from 'jquery';
import { from } from 'rxjs';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {
  examData: any;
  token: any;
  element:any;
  constructor(
    private router: Router,
    private examService:ExamService,
  )
  {
    this.token = localStorage.getItem('token');
  }

 ngOnInit() {
    this.get_examdata();
    //this.loadtablejQuery();

     jQuery(document).ready(function () {
           
        jQuery(".re-custom-table .downarrow").click(function () {
          
          // if (
          //   jQuery(".re-custom-table .table .subdrop .table").hasClass("tableshow")
          // ) {
          //   if (jQuery(this).parent().parent().parent().hasClass("tableshow")) {
          //     jQuery(this).parent().parent().parent().removeClass("tableshow");
          //   } else {
          //     jQuery(".re-custom-table .table .subdrop .table").removeClass(
          //       "tableshow"
          //     );
          //     jQuery(this).parent().parent().parent().addClass("tableshow");
          //   }
          // } else {
          //   jQuery(this).parent().parent().parent().addClass("tableshow");
          // }
        });
     });
  }
  clickSub(element:any){
    jQuery(document).ready(function () {   
      jQuery(".gapcls").removeClass("tableshow");
      jQuery("."+element).addClass("tableshow");
      
     });
  }
  
  get_examdata()
  { 
    this.examService.getexamDetails({token:this.token}).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            this.examData = response.result;   
          }
        },
      );
  }

  loadtablejQuery()
  {
      // jQuery(document).ready(function () {
      //   jQuery(".re-custom-table .downarrow").click(function () {
      //     if (
      //       jQuery(".re-custom-table .table .subdrop .table").hasClass(
      //         "tableshow"
      //       )
      //     ) {
      //       if (jQuery(this).parent().parent().parent().hasClass("tableshow")) {
      //         jQuery(this).parent().parent().parent().removeClass("tableshow");
      //       } else {
      //         jQuery(".re-custom-table .table .subdrop .table").removeClass(
      //           "tableshow"
      //         );
      //         jQuery(this).parent().parent().parent().addClass("tableshow");
      //       }
      //     } else {
      //       jQuery(this).parent().parent().parent().addClass("tableshow");
      //     }
      //   });
      // });

      // jQuery(document).ready(function () {
      //   jQuery(".re-custom-table .fixbody").scroll(function () {
      //     jQuery(".re-custom-table thead").css(
      //       "left",
      //       -jQuery(".re-custom-table tbody").scrollLeft()
      //     );
      //     jQuery(".re-custom-table thead th:nth-child(1)").css(
      //       "left",
      //       jQuery(".re-custom-table .fixbody").scrollLeft()
      //     );
      //     jQuery(
      //       ".re-custom-table .fixbody .downarrow, .re-custom-table .subdrop .re-hide td:nth-child(1), .re-custom-table .fixbody tr th:nth-child(1)"
      //     ).css("left", jQuery(".re-custom-table .fixbody").scrollLeft());
      //   });
      // });
   
  }

  delete_exam(listid:any)
  {
    var mylist = {id:listid};
    this.examService.delete_exam(mylist).subscribe(
      (response)=> {
        if (response.code == 200) 
        { 
          this.router.navigate(['/exam/view']);
        }
      },
    );
  }

}
