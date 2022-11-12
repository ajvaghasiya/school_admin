import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails = (data:any,role:any): Observable<any> => {
    let endpoint = environment. baseUrl+'/api/users_details/get_user_detail';
    if (role) {
      endpoint += `?role=${role}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getprofileData = (data:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/users_details/get_user_profile';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletelistuser = (data:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/users_details/deletelistuser';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}
