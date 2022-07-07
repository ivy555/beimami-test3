import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { MainService } from "./main.service";

@Injectable({
  providedIn: "root"
})
export class CartService extends MainService {
  constructor(private http: HttpClient) {
    super();
  }
  buy(order) {
    var token = localStorage.getItem("token");
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + token);

    return this.http
      .post(this.serverUrl + "orders", order, { headers: headers })
      .pipe(
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
  }
}
