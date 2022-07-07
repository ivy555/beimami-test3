import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { MainService } from "./main.service";
@Injectable({
  providedIn: "root"
})
export class HomeService extends MainService {
  constructor(private http: HttpClient) {
    super();
  }
  getPopluarAds() {
    //var token = localStorage.getItem('token');
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + token);

    return this.http
      .get(
        this.serverUrl +
          "/ads/?filter[where][isPopular]=true&filter[where][approved]=true"
      )
      .pipe(
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
  }
  getDealsAds() {
    return this.http
      .get(
        this.serverUrl +
          "/ads/?filter[where][isDeal]=true&filter[where][approved]=true"
      )
      .pipe(
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
  }
}
