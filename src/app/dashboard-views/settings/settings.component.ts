import { ProfileService } from "./../../services/profile.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}

  data: any;
  settingsForm: FormGroup;
  error: string = null;
  success: string = null;

  newpassw: any;
  confpassw: any;

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      response => {
        this.data = response;
        console.log(response);
      },
      errorMessage => {
        console.log("Error Response: " + errorMessage);
      }
    );

    this.settingsForm = new FormGroup({
      np: new FormControl(
        null,
        Validators.compose([Validators.minLength(8), Validators.required])
      ),
      cp: new FormControl(
        null,
        Validators.compose([Validators.minLength(8), Validators.required])
      )
    });

    this.newpassw = this.settingsForm.controls["np"];
    this.confpassw = this.settingsForm.controls["cp"];
  }

  getNewPassword() {
    return this.newpassw.value;
  }

  getConfPassword() {
    return this.confpassw.value;
  }

  newIsNotOld(oldp, newp) {
    return oldp === newp;
  }

  newMatchesConfirm(newp, confp) {
    return newp === confp;
  }

  onSubmit() {
    // CHECK IF OLD PASSW MATCHES THE USERS PASSW ?
    if (
      !this.settingsForm.valid ||
      !this.newMatchesConfirm(this.getNewPassword(), this.getConfPassword())
    ) {
      this.error = "Password mismatched.";
      setTimeout(() => {
        this.error = null;
      }, 3000);
      return;
    } else {
      this.success = "Password updated.";
      setTimeout(() => {
        this.success = null;
      }, 3000);

      // PUSH NEW PASSWORD TO DATABASE ?
      return;
    }
  }
}
