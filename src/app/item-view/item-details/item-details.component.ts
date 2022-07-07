import { CartService } from "src/app/services/cart.service";
import { AdService } from "./../../services/ad.service";
import { Component, OnInit } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"]
})
export class ItemDetailsComponent implements OnInit {
  data = null;
  itemId: string;
  showPurchaseButtons: boolean = true;
  success: string = null;
  error: string = null;
  itemExistsInCart: boolean = true;
  constructor(
    private router: Router,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private adService: AdService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemId = params["itemId"];
      if (this.itemId) {
        this.itemService.getItemDetails(this.itemId).subscribe(
          response => {
            if (response && response.length > 0) {
              this.data = response[0];
              if (this.data["ownerId"] == localStorage.getItem("userId")) {
                this.showPurchaseButtons = false;
              }
            } else {
              this.router.navigateByUrl("/dashboard/items-sale");
            }
          },
          errorMessage => {
            console.log("Error Response: ");
            console.log(errorMessage);
          }
        );
      } else {
      }
    });
  }

  addToCart() {
    if (!localStorage.getItem("token")) {
      this.success = "Please register or login First";
      setTimeout(() => {
        this.success = null;
      }, 3000);
      localStorage.setItem("cart", JSON.stringify([this.data]));
      localStorage.setItem("redirect_url", "/shopping-cart");
      this.router.navigateByUrl("/register");
    } else {
      if (localStorage.getItem("cart")) {
        let existingEntries = JSON.parse(localStorage.getItem("cart"));
        for (let record of existingEntries) {
          if (record.id == this.data.id) {
            this.itemExistsInCart = false;
            break;
          }
        }
        if (this.itemExistsInCart) {
          existingEntries.push(this.data);
          this.showMessageCart(
            "The Item has successfully added into the cart."
          );
        } else {
          this.showMessageCart("This item is already added into the cart.");
        }
        localStorage.setItem("cart", JSON.stringify(existingEntries));
      } else {
        localStorage.setItem("cart", JSON.stringify([this.data]));
      }
    }
  }
  itemSold() {
    this.success = "This item is already sold.";
    setTimeout(() => {
      this.success = null;
    }, 3000);
  }
  showMessageCart(msg) {
    this.success = msg;
    setTimeout(() => {
      this.success = null;
    }, 3000);
  }
  buy(adId) {
    if (!localStorage.getItem("token")) {
      this.success = "Please Register or login First to buy the item.";
      setTimeout(() => {
        this.success = null;
      }, 3000);
      localStorage.setItem("cart", JSON.stringify([this.data]));
      localStorage.setItem("redirect_url", "/shopping-cart");
      this.router.navigateByUrl("/register");
    } else {
      this.success = "You have bought this item Successfully";
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.adService.saveAd({ sold: true }, adId).subscribe(
        result => {
          this.cartService
            .buy({ adId: parseInt(adId, 10) })
            .subscribe(response => {
              setTimeout(() => {
                this.success = null;
                this.router.navigate(["/home"]);
              }, 3000);
            });
        },
        errorMessage => {
          console.log(errorMessage);
        }
      );
    }
  }
}
