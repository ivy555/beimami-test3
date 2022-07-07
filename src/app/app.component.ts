import { Component } from '@angular/core';
import { API_Globals } from 'src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  isLogged = false;
  serverUrl = API_Globals.server_url;
}
