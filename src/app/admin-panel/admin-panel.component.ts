import { Component, OnInit } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { ProfileService } from "../services/profile.service";

@Component({
  selector: "app-items-sale",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"]
})
export class AdminPanelComponent implements OnInit {
  data: any;
  users: any;
  types = ["Items", "Users"];
  filterForm: FormGroup;
  success: string = null;
  error: string = null;
  isUserAdmin: boolean = false;
  constructor(
    private itemService: ItemService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      response => {
        this.isUserAdmin = response.isAdmin;
        if (!this.isUserAdmin) this.router.navigateByUrl("/home");
      },
      errorMessage => {
        console.log("Error Response: " + errorMessage);
      }
    );

    this.loadItems("all");
    this.filterForm = new FormGroup({
      type: new FormControl("Items"),
      active: new FormControl(true),
      inactive: new FormControl(true)
    });

    this.filterForm.statusChanges.subscribe(status => {
      const formValue = this.filterForm.value;
      console.log(status), console.log(this.filterForm.value);
      if (formValue.type === "Items") {
        if (formValue.active && formValue.inactive) {
          this.loadItems("all");
        } else if (formValue.active && !formValue.inactive) {
          this.loadItems("active");
        } else if (!formValue.active && formValue.inactive) {
          this.loadItems("inactive");
        } else {
          this.data = [];
        }
      } else {
        this.loadUsers();
      }
    });
  }

  toggleApprove(item: any, approved: boolean) {
    this.itemService.toggleApprove(item, "approve").subscribe(
      response => {
        approved
          ? (this.success = "Item Un-Approved Successfully.")
          : (this.success = "Item Approved Successfully.");
        setTimeout(() => {
          this.success = null;
        }, 2500);
        this.ngOnInit();
      },
      errorMessage => {
        approved
          ? (this.error = "Item could not Un-Approved at this time.")
          : (this.error = "Item could not Approved at this time.");
        setTimeout(() => {
          this.error = null;
        }, 2500);
      }
    );
  }
  togglePopular(item: any, popular: boolean) {
    this.itemService.toggleApprove(item, "popular").subscribe(
      response => {
        popular
          ? (this.success = "Item has been made un-popular Successfully.")
          : (this.success = "Item has been made popular Successfully.");
        setTimeout(() => {
          this.success = null;
        }, 2500);
        this.ngOnInit();
      },
      errorMessage => {
        popular
          ? (this.error = "Item could not be made un-popular at this time.")
          : (this.error = "Item could not popular at this time.");
        setTimeout(() => {
          this.error = null;
        }, 2500);
      }
    );
  }
  toggleDeal(item: any, deal: boolean) {
    this.itemService.toggleApprove(item, "deal").subscribe(
      response => {
        deal
          ? (this.success =
              "Item has been removed from the deal list Successfully.")
          : (this.success = "Item has been added to deal list Successfully.");
        setTimeout(() => {
          this.success = null;
        }, 2500);
        this.ngOnInit();
      },
      errorMessage => {
        deal
          ? (this.error =
              "Item could not removed from the deal list at this time.")
          : (this.error = "Item could not be added to deal list at this time.");
        setTimeout(() => {
          this.error = null;
        }, 2500);
      }
    );
  }
  navigateToDetails(event: any, item: any) {
    this.router.navigateByUrl("/item-view?itemId=" + item.id);
    console.log(item.id);
  }
  loadItems(filter: string) {
    this.itemService.getFilteredItems(filter).subscribe(
      response => {
        this.data = response;
      },
      errorMessage => {
        console.log("Error Response: ");
        console.log(errorMessage);
      }
    );
  }
  loadUsers() {
    this.itemService.getAllUsers().subscribe(
      response => {
        this.users = response;
      },
      errorMessage => {
        console.log("Error Response: " + errorMessage);
      }
    );
  }

  deleteUser(userId: number) {
    this.itemService.deleteUser(userId).subscribe(
      response => {
        this.success = "User has been deleted Successfully";
        setTimeout(() => {
          this.success = null;
        }, 2500);
        this.ngOnInit();
      },
      errorMessage => {
        this.error = "User could not be deleted at this time.";
        setTimeout(() => {
          this.error = null;
        }, 2500);
      }
    );
  }
}
