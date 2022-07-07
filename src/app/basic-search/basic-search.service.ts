import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

export class BasicSearchService {
    headers = new Headers();
    searchURL = environment.backendBaseUrl +'/search';
    constructor(private http: HttpClient) { }
    search(params) : Observable<any> {
        this.headers.append('Content-Type', 'application/json');
        let response  = this.http.get(this.searchURL,{params: params}).pipe(map(res => res));
        return response;
    }
}