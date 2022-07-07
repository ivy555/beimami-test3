import { AdService } from "./../../services/ad.service";
import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart-finalize",
  templateUrl: "./cart-finalize.component.html",
  styleUrls: ["./cart-finalize.component.css"]
})
export class CartFinalizeComponent implements OnInit {
  localsotrageitem;
  success;
  error: string = null;
  
  constructor(
    private CartService: CartService,
    private router: Router,
    private adService: AdService
    ) {}
    
    ngOnInit() {
      this.getitems();
    }
    getitems() {
      this.localsotrageitem = JSON.parse(localStorage.getItem("cart"));
      //get cart items from local storage
    }
    
    emptyCart() {
      if (this.localsotrageitem.length == 0) {
        this.success = "There are no items in the cart";
        setTimeout(() => {
          this.success = null;
          this.router.navigate(["/home"]);
        }, 3000);
      }
      this.success = "All items have been removed from cart successfully";
      localStorage.removeItem("cart");
      setTimeout(() => {
        this.success = null;
        this.router.navigate(["/home"]);
      }, 3000);
    }
    buyAll() {
      var check = true;
      if (this.localsotrageitem.length == 0) {
        this.success = "There are no items in the cart";
        setTimeout(() => {
          this.success = null;
        }, 3000);
      } else {
        for (let ad of this.localsotrageitem) {
          this.CartService.buy({ adId: ad.id }).subscribe(
            response => {
              console.log("Success Response: " + response);
              this.success = "You have bought all items Successfully";
              this.adService.markAsSold(ad.id).subscribe((res)=>{});
              localStorage.removeItem("cart");
              setTimeout(() => {
                this.success = null;
                this.router.navigate(["/home"]);
              }, 3000);
            },
            errorMessage => {
              check = false;
              console.log(
                "Something went wrong please try again",
                errorMessage
                );
              }
              );
            }
          }
          if (check) {
            localStorage.setItem("cart", "[]");
          }
        }
      }
      