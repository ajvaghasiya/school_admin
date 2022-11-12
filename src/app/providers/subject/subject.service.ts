import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getTeacherDetails = (data:any,role:any): Observable<any> => {
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

  getsubjectDetails = (data:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/subject/view_subject';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
  getsubjectWithId = (moreData:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/subject/getsubjectWithId';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addSubject = (moreData:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/subject/add_subject';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editsubjectdata = (moreData:any,userId:any): Observable<any> => {
    let endpoint = environment. baseUrl+'/api/subject/editsubjectdata';
    if (userId) {
      endpoint += `?id=${userId}`;
    }
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletesubject = (data:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/subject/deletesubject';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}
