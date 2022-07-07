import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService extends MainService {
  constructor(private http: HttpClient) {
    super();
  }
  getCategories() 
  {
    //var token = localStorage.getItem('token');
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + token);
    
    return this.http.get(this.serverUrl + 'categories')
    .pipe(catchError(
      errorResponse => {
        return throwError(errorResponse);        
      }));
  }
  getAds(url) 
  {    
    return this.http.get(this.serverUrl + url)
    .pipe(catchError(
      errorResponse => {
        return throwError(errorResponse);        
      }));
    }
  }
  