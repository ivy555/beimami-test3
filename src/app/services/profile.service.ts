import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { API_Globals } from '../../global';

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  isLogged = false;
  constructor(private http: HttpClient) {}

  getProfile() {
    if (localStorage.getItem("userId")) {
      const url =
        API_Globals.server_url + "users/me?filter[where][ownerId]=" +
        localStorage.getItem("userId");
      return this.http.get<any>(url).pipe(
        catchError(errorResponse => {
          let errorMessage = "Get item by id not succesful";
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.statusCode) {
            case 404:
              errorMessage = "Data not found.";
              break;
            case 403:
              errorMessage = "Unauthorized.";
              break;
          }
          return throwError(errorMessage);
        }),
        tap(resData => {
          console.log("data found");
          console.log(resData);
        })
      );
    }
    return throwError ('empty local storage');
  }

  saveProfile(user) {
    var token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http
      .put(API_Globals.server_url + "users/" + userId, user, { headers: headers })
      .pipe(
        catchError(errorResponse => {
          return throwError(errorResponse);
        }),
        tap(resData => {
          console.log(resData);
        })
      );
  }
}
