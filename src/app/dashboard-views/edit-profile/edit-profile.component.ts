import { ProfileService } from "./../../services/profile.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}
  data: any;
  profileForm: FormGroup;
  error: string = null;
  success: string = null;

  selValue: any;
  cityValue: any;
  addressValue: any;
  phoneValue: any;


  ngOnInit() {
    this.profileService.getProfile().subscribe(
      response => {
        this.data = response;
        this.selValue = this.data.country;
        this.cityValue = this.data.city;
        this.addressValue = this.data.address;
        this.phoneValue = this.data.phone;

      },
      errorMessage => {
        console.log("Error Response: " + errorMessage);
      }
    );

    this.profileForm = new FormGroup({
      address: new FormControl(),
      city: new FormControl(),
      phone: new FormControl(),
      country: new FormControl()
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  ImageSelected(){
    
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.error = "Please enter a valid data.";
      setTimeout(() => {
        this.error = null;
      }, 3000);
      return;
    }

    let user = this.profileForm.value;
    user["name"] = this.data.name;
    user["email"] = this.data.email;
    this.profileService.saveProfile(user).subscribe(
      response => {
        console.log("Success Response: " + response);
        this.success = "Profile has been updated Successfully";
        setTimeout(() => {
          this.success = null;
        }, 3000);

        this.router.navigate(["dashboard/edit-profile"]);
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
