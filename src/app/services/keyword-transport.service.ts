import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordTransportService {

  private keywordTransport = new BehaviorSubject<any>([]);
  currentKeywords = this.keywordTransport.asObservable();

  constructor() { }
    changeKeywords(keywords: any[]) {
      this.keywordTransport.next(keywords);
  }

}
