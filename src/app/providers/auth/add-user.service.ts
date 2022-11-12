import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }
  
  addUser = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/register';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editUserdata = (moreData:any,userId:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/users/editUserdata';
    if (userId) {
      endpoint += `?id=${userId}`;
    }
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
 
  getdataWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users_details/getuserWithid';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };
  

}
