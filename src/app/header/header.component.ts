import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthorizationService } from "../services/authorization.service";
import { AppComponent } from "../app.component";
import { from } from "rxjs";
import { ProfileService } from "../services/profile.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  data: any;
  cartTotal = 0;
  isLogged = false;

  constructor(
    private router: Router,
    public appComp: AppComponent,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.appComp.isLogged = true;
    }
    this.profileService.getProfile().subscribe(
      (response) => {
        this.data = response.isAdmin;
      },
      (errorMessage) => {
        console.log("Error Response: " + errorMessage);
      }
    );
  }

  // get value from Shopping Cart service or similar stuff.
  getCartTotal() {
    if (localStorage.getItem("cart") !== null) {
      this.cartTotal = JSON.parse(localStorage.getItem("cart")).length;
    }

    return this.cartTotal;
  }

  getIsLogged() {
    return this.appComp.isLogged;
  }

  redirect(link) {
    this.router.navigateByUrl(link);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/home"]);
    this.appComp.isLogged = false;
    // if (localStorage.getItem("token")) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("userId");
    //   this.appComp.isLogged = false;      
    // }
  }
}
