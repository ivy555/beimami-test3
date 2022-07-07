import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { API_Globals } from '../../global';
export interface UserResponse {
  token: string;
  userId: string;
}
@Injectable({
  providedIn: "root"
})
export class AuthorizationService {
  isLogged = false;
  constructor(private http: HttpClient) {}
  showMessage() {
    console.log("service works");
    if (localStorage.getItem("token")) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  register(email: string, password: string, name: string) {
    return this.http
      .post<UserResponse>(API_Globals.server_url + "users/signup", {
        name: name,
        email: email,
        password: password,
        isAdmin: false,
        active: true,
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = "Signup not successful";
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.statusCode) {
            case 401:
              errorMessage = "Invalid email or password.";
              break;
            case 409:
              errorMessage = "Email already exists.";
              break;
          }
          return throwError(errorMessage);
        }),
        tap(resData => {
          localStorage.setItem("token", resData.token);
          localStorage.setItem("userId", resData.userId);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<UserResponse>(API_Globals.server_url + "users/login", {
        email: email,
        password: password
      })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = "Login not successful";
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.statusCode) {
            case 401:
              errorMessage = "Invalid email or password.";
              break;
          }
          return throwError(errorMessage);
        }),
        tap(resData => {
          localStorage.setItem("token", resData.token);
          localStorage.setItem("userId", resData.userId);
        })
      );
  }
}
