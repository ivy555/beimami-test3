import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService extends MainService {
  userId;
  url;
  message;
  constructor(private http: HttpClient) {
    super();
    this.userId = localStorage.getItem('userId');
  }
  getLatestSentMessage() 
  {    
    this.url = `message?filter[order]=updated_at%20DESC&filter[limit]=1&filter[where][senderId]=${this.userId}&filter[include][0][relation]=ad&filter[include][1][relation]=sender`;
    return this.sendGetRequest();
  }
  getLatestReceivedMessages() 
  {    
    this.url = `message?filter[order]=updated_at%20DESC&filter[limit]=1&filter[where][receiverId]=${this.userId}&filter[include][0][relation]=ad&filter[include][1][relation]=sender`;
    return this.sendGetRequest();
  }
  getSentMessageForAd(adId) 
  {    
    this.url = `message?filter[order]=updated_at%20DESC&filter[where][adId]=${adId}&filter[where][senderId]=${this.userId}&filter[include][0][relation]=ad&filter[include][1][relation]=sender`;
    return this.sendGetRequest();
  }
  getReceivedMessageForAd(adId) 
  {    
    this.url = `message?filter[order]=updated_at%20DESC&filter[where][adId]=${adId}&filter[where][receiverId]=${this.userId}&filter[include][0][relation]=ad&filter[include][1][relation]=sender`;
    return this.sendGetRequest();
  }
  getAd(adId){
    this.url = `ads/${adId}?filter[include][0][relation]=owner`;
    return this.sendGetRequest();
  }
  sendMessage(adId, receiverId, message){
    message = {
      adId : adId,
      receiverId : receiverId,
      message : message
    };
    this.url = 'message';
    var token = localStorage.getItem('token');
    let headers: HttpHeaders = new HttpHeaders();
    return this.sendPostRequest(message, headers);
  }
  sendGetRequest(){
    return this.http.get(this.serverUrl + this.url)
    .pipe(catchError(errorResponse => {
      return throwError(errorResponse);
    }));
  }
  sendPostRequest(data, headers){    
    return this.http
    .post(this.serverUrl + this.url, data, { headers: headers })
    .pipe(catchError(errorResponse => {
      return throwError(errorResponse);
    }));
  }
}