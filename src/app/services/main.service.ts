import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { API_Globals } from '../../global';
@Injectable({
    providedIn: 'root'
})
export class MainService {
    headers: HttpHeaders;
    serverUrl: string;
    constructor() { 
        this.serverUrl = API_Globals.server_url;
        var token = localStorage.getItem('token');
        //this.headers = new HttpHeaders();
        //headers = headers.append('Authorization', 'Bearer ' + token);
    }    
}
