import { Component,OnInit  } from '@angular/core';
import { NavigationEnd,Router } from '@angular/router';
import { Location } from "@angular/common";
 
import { from } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'admin';
  ifHeader: boolean = true;
  isNavVisible: boolean = false;
   
  constructor(
    private router:Router,
    public location: Location
  ) {
    
    /* console.log(this.location.path());
     if(this.location.path() == '/auth/login'){
        this.ifHeader = false;
       
    } */

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
         if(val['urlAfterRedirects'] == '/auth/login'){
          this.ifHeader = false;
         }
         if(val['urlAfterRedirects'] == '/'){
          this.ifHeader = true;
         
         }
         
      }
    });
  }
    
  ngOnInit(): void {
    
  }
}
