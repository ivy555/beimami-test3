import { AdService } from "./../../services/ad.service";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"]
})
export class CartItemComponent implements OnInit {
  @Input() item_title;
  @Input() item_description;
  @Input() item_price;
  @Input() item_id;
  @Input() thumbnail;
  success: string = null;
  error: string = null;
  localsotrageitem;
  constructor(
    private router: Router,
    //private appComp: AppComponent,
    public appComp: AppComponent,
    private cartService: CartService,
    private adService: AdService
    ) {}
    
    ngOnInit() {
      this.getitems();
    }
    
    redirect(link) {
      this.router.navigateByUrl(link);
    }
    
    buy(adId) {
      this.cartService.buy({ adId: parseInt(adId, 10) }).subscribe(response => {
        console.log("placed order:" + response);
        this.success = "You have successfully bought the item.";
        this.adService.markAsSold(adId).subscribe((res)=>{});
        setTimeout(() => {
          this.success = null;
          this.router.navigate(["/home"]);
        }, 3000);
        
        //localStorage.removeItem("cart");
        //find the specific item from localstorage
        const index = this.localsotrageitem.findIndex(x => {
          return x.id == adId;
        });
        
        if (index !== undefined) {
          this.localsotrageitem.splice(index, 1);
          console.log(this.localsotrageitem);
          localStorage.setItem(
            "cart",
            JSON.stringify(this.localsotrageitem)
            );
            //location.reload();
          }
          //remove it after success
        });
      }
      getitems() {
        this.localsotrageitem = JSON.parse(localStorage.getItem("cart"));
      }
    }
    