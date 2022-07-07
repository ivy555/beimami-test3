import { PostItemComponent } from "./../../post-item/post-item.component";
import { Component, OnInit } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-items-sale",
  templateUrl: "./items-sale.component.html",
  styleUrls: ["./items-sale.component.css"]
})
export class ItemsSaleComponent implements OnInit {
  data: any;
  success: string = null;
  error: string = null;
  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.itemService.getAllItems().subscribe(
      response => {
        this.data = response;
      },
      errorMessage => {
        console.log("Error Response: ");
        console.log(errorMessage);
      }
    );
  }
  updateItem(item: any) {
    this.router.navigateByUrl("/post-item?itemId=" + item.id);
  }
  navigateToDetails(event: any, item: any) {
    this.router.navigateByUrl("/item-view?itemId=" + item.id);
    console.log(item.id);
  }
  deleteItem(item: any) {
    this.itemService.deleteItem(item).subscribe(
      response => {
        console.log("Success Response: " + response);
        this.success = "Item has been deleted Successfully.";
        setTimeout(() => {
          this.success = null;
        }, 3000);
        this.ngOnInit();
      },
      errorMessage => {
        console.log("Error Response: " + errorMessage.message);
        this.error = errorMessage.message;
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    );
  }
}
