import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  addExam = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/exam/add_exam';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getexamDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/exam/view_exam';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
  getexamWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/exam/getexamWithId';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editexamdata = (moreData:any,userId:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/exam/editexamdata';
    if (userId) {
      endpoint += `?id=${userId}`;
    }
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  delete_exam = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/exam/delete_exam';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}
