import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isLogged = true;
  popularAds: any;
  dealAds: any;
  message: string;
  
  constructor(
    private router: Router,
    private homeService: HomeService,
    //private appComp: AppComponent
    public appComp: AppComponent) { }

  ngOnInit() {
    this.getPopular();
    this.getDeals();
    if (localStorage.getItem("token")) {
      this.appComp.isLogged = true;
    }
  }
  ngAfterViewInit(){
    
  }
  // sendMessage(){
  //   this.socket.emit("message", this.message);
  // }
  getPopular(){
    this.homeService.getPopluarAds().subscribe((response) => {
      this.popularAds = response;
    });
  }
  getDeals(){
    this.homeService.getDealsAds().subscribe((response) => {
      this.dealAds = response;
    });
  }
  redirect(link) {
    this.router.navigateByUrl(link);
  }
}
