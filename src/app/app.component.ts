import { Component } from '@angular/core';
import { API_Globals } from 'src/global';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  isLogged = false;
  serverUrl = API_Globals.server_url;
  constructor(  
    public translate: TranslateService) {  
    translate.addLangs(['en', 'fr']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
    }  
  }  
  changeLang(language: string) {  
    localStorage.setItem('locale', language);  
    this.translate.use(language);  
  }  
  

}
