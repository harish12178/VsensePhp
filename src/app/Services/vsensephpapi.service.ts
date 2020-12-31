import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VsensephpapiService {
  server_address="http://192.168.3.50";
  constructor(public httpClient:HttpClient) { }
  gettempvalue(loc:string):Observable<any>{
    return this.httpClient.get<any[]>(this.server_address+"/temperature"+loc+".php")
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getvibrvalue(loc:string):Observable<any>{
    return this.httpClient.get<any[]>(this.server_address+"/vibration"+loc+".php")
    .pipe(
      catchError(this.errorHandler)
    )
  }
  gethumdvalue(loc:string):Observable<any>{
    return this.httpClient.get<any[]>(this.server_address+"/humidity"+loc+".php")
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getcrntvalue(loc:string):Observable<any>{
    return this.httpClient.get<any[]>(this.server_address+"/current"+loc+".php")
    .pipe(
      catchError(this.errorHandler)
    )
  }
  login(username,password):Observable<any>{
    return this.httpClient.post<any>(this.server_address+"/login.php",{username,password})
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: HttpErrorResponse): Observable<any[]> {
    return throwError(error.error instanceof Object ? error.error.Message ? error.error.Message : error.error : error.error || error.message || 'Server Error');
  }
}
