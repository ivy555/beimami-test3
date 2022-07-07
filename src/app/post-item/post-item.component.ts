import { ItemService } from "src/app/services/item.service";
import { Component, OnInit } from "@angular/core";
import { AdService } from "../services/ad.service";
import { SearchService } from "../services/search.service";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.css"]
})
export class PostItemComponent implements OnInit {
  data: any;
  files: File[] = [];
  categories: any;
  error: string = null;
  success: string = null;
  edit: string = null;
  itemId: string = null;
  adForm: FormGroup;
  constructor(
    private adService: AdService,
    private itemService: ItemService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchService.getCategories().subscribe((response: any) => {
      this.categories = response;
    });

    this.route.queryParams.subscribe(params => {
      this.itemId = params["itemId"];
      if (this.itemId) {
        this.itemService.getItemDetails(this.itemId).subscribe(
          response => {
            if (response && response.length > 0) {
              this.data = response[0];
              this.ad.item_name = this.data.item_name;
              this.ad.categoryId = this.data.categoryId;
              this.ad.item_description = this.data.item_description;
              this.ad.price = this.data.price;
              this.ad.security_amount = this.data.security_amount;
              this.ad.sale_rent = this.data.sale_rent;
              this.ad.used_new = this.data.used_new;
            }
          },
          errorMessage => {
            console.log("Error Response: ");
            console.log(errorMessage);
          }
        );
      }
    });
  }

  ad = {
    item_name: "",
    item_description: "",
    price: null,
    security_amount: 0,
    sale_rent: "",
    used_new: "",
    categoryId: null
  };
  editAd() {
    console.log("POST- Item to EDIT: " + this.itemId);
  }
  saveAd() {
    this.ad.categoryId = parseInt(this.ad.categoryId);
    if (this.itemId == null) {
      this.adService.saveAd(this.ad, null).subscribe((response: any) => {
        var adId = response.id;
        this.saveAdPictures(adId);
        console.log("ad response", response);
        this.success = "The Item has been saved successfully.";
      });
    } else {
      this.adService.saveAd(this.ad, this.itemId).subscribe((response: any) => {
        var adId = parseInt(this.itemId);
        this.saveAdPictures(adId);
        console.log("ad response", response);
        this.success =
          "The Item has been updated successfully and sent for approval.";
      });
    }
  }
  saveAdPictures(adId: number) {
    const formData = new FormData();
    formData.append("adId", String(adId));
    for (let file of this.files) {
      formData.append("files[]", file);
    }
    this.adService.saveAdPictures(formData).subscribe(
      response => {
        this.ad.categoryId = null;
        this.ad.item_name = "";
        this.ad.item_description = "";
        this.ad.price = "";
        this.ad.sale_rent = null;
        this.ad.used_new = null;
        this.files = null;
        (<HTMLInputElement>document.getElementById("files-input")).value = "";
        setTimeout(() => {
          this.success = null;
        }, 2500);
      },
      errorMessage => {
        this.error = "Item could not be saved at this time.";
        setTimeout(() => {
          this.error = null;
        }, 2500);
      }
    );

    this.router.navigate(["/post-item"]);
  }
  ImageSelected(event: any) {
    console.log(event.target.files);
    this.files = event.target.files;
  }
}
