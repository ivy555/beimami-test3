import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { API_Globals } from "../../global";
@Injectable({
  providedIn: "root"
})
export class AdService {
  isLogged = false;
  constructor(private http: HttpClient) {}
  saveAd(ad, itemId: string = null) {
    if (itemId == null) {
      var token = localStorage.getItem("token");
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("Authorization", "Bearer " + token);
      return this.http
        .post(API_Globals.server_url + "ads", ad, { headers: headers })
        .pipe(
          catchError(errorResponse => {
            return throwError(errorResponse);
          }),
          tap(resData => {
            console.log(resData);
          })
        );
    } else {
      console.log("HEER IN THE EDIT");
      var token = localStorage.getItem("token");
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("Authorization", "Bearer " + token);
      return this.http
        .put(API_Globals.server_url + "ads/" + itemId, ad, { headers: headers })
        .pipe(
          catchError(errorResponse => {
            console.log(errorResponse);
            return throwError(errorResponse);
          }),
          tap(resData => {
            console.log(resData);
          })
        );
    }
  }
  saveAdPictures(formData) {
    var token = localStorage.getItem("token");
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http
      .post(API_Globals.server_url + "ads/upload-ad-image", formData, {
        headers: headers
      })
      .pipe(
        catchError(errorResponse => {
          return throwError(errorResponse);
        }),
        tap(resData => {
          console.log(resData);
        })
      );
  }
  markAsSold(adId){
    var token = localStorage.getItem("token");
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http
      .get(API_Globals.server_url + `ads/mark-sold/${adId}`, {
        headers: headers
      })
      .pipe(
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
  }
}
