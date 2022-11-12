import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  addClass = (moreData:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/class/add_class';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getclassDetails = (data:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/class/view_class';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getclassWithId = (moreData:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/class/getclassWithId';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editclassdata = (moreData:any,userId:any): Observable<any> => {
    let endpoint = environment. baseUrl+'/api/class/editclassdata';
    if (userId) {
      endpoint += `?id=${userId}`;
    }
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteclass = (data:any): Observable<any> => {
    const endpoint = environment. baseUrl+'/api/class/deleteclass';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


}
