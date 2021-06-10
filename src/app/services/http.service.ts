import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  // tslint:disable-next-line:typedef
  get(url){
    return this.http.get<any>(url);
  }

  // tslint:disable-next-line:typedef
  post(url, data){}
}
