import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { API_Globals } from '../../global';
export interface UserResponse {
  token: string;
}
@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private http: HttpClient) {}
  getItemDetails(itemId: string): Observable<any> {
    // tslint:disable-next-line: quotemark
    // tslint:disable-next-line: object-literal-key-quotes
    const filter =
      "?filter=" +
      JSON.stringify({
        include: [{ relation: "owner" }, { relation: "pictures" }]
      });
    return this.http
      .get<UserResponse>(
        API_Globals.server_url + "ads?filter[include][0][relation]=pictures&filter[include][1][relation]=owner&filter[where][id]=" +
          itemId
      )
      .pipe(
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
          console.log("Item Deleted:" + resData);
        })
      );
  }
  getAllItems() {
    if (localStorage.getItem("userId")) {
      const url =
        API_Globals.server_url + "ads?filter[where][ownerId]=" +
        localStorage.getItem("userId");
      return this.http.get<UserResponse>(url).pipe(
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
  }

  getHistoryItems() {
    if (localStorage.getItem("userId")) {
      let url =
        API_Globals.server_url + "orders?filter[include][0][relation]=buyer&filter[include][1][relation]=ad&filter[where][buyerId]=" +
        localStorage.getItem("userId");
      return this.http.get<UserResponse>(url).pipe(
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
  }
  deleteItem(itemId: string) {
    if (itemId) {
      const url = API_Globals.server_url + "ads/" + itemId;
      return this.http.delete<UserResponse>(url).pipe(
        catchError(errorResponse => {
          let errorMessage = "Item Could not be deleted at this time";
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
  }
  toggleApprove(itemId: any, method: string) {
    if (itemId) {
      const url = API_Globals.server_url + "ads/toggle-" + method + "/" + itemId;
      return this.http.get<UserResponse>(url).pipe(
        catchError(errorResponse => {
          let errorMessage = "Item could not be approved at this time.";
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
          console.log(resData);
        })
      );
    }
  }

  getFilteredItems(filter: string) {
    let url = API_Globals.server_url + "ads";
    if (filter === "active") {
      url = API_Globals.server_url + "ads?filter[where][approved]=1";
    }

    if (filter === "inactive") {
      url = API_Globals.server_url + "ads?filter[where][approved]=0";
    }
    return this.http.get<UserResponse>(url).pipe(
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

  getAllUsers() {
    if (localStorage.getItem("userId")) {
      const url = API_Globals.server_url + "users?filter[where][isAdmin]=false";
      return this.http.get<UserResponse>(url).pipe(
        catchError(errorResponse => {
          let errorMessage = "Get users not succesful";
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
  }

  deleteUser(userId: number) {
    if (userId) {
      const url = API_Globals.server_url + "users/" + userId;
      return this.http.delete<UserResponse>(url).pipe(
        catchError(errorResponse => {
          let errorMessage = "User Could not be deleted at this time";
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
  }
}
