import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
//import { google } from '@agm/core/services/google-maps-types';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  findNearbyRestaurantPlaces(lat, lng): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    return this.http.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius=500&type=restaurant&keyword=cruise&key=AIzaSyB7GCWqlqr5o8BWbZQ8Eg88o0hnvOU71Us'
      , httpOptions
    );
  }
}
