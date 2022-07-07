import { Component, OnInit } from "@angular/core";
import { FormControl, FormArray, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { areAllEquivalent } from "@angular/compiler/src/output/output_ast";
import { HttpClient } from "@angular/common/http";
import { AuthorizationService } from "src/app/services/authorization.service";
import { Router } from "@angular/router";
import { passValidator } from "./validators";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthorizationService,
    private router: Router,
    public appComp: AppComponent
  ) {}

  genders = ["male", "female"];
  signupForm: FormGroup;
  error: string = null;

  ngOnInit() {
    this.authService.showMessage();
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        passValidator
      ])
      // 'gender': new FormControl('male')
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.error = "Please enter a valid data.";
      setTimeout(() => {
        this.error = null;
      }, 2500);
      return;
    }
    if (
      this.signupForm.value.email &&
      !this.signupForm.value.email.includes("@beimami")
    ) {
      this.error = "Please enter your  email.";
      setTimeout(() => {
        this.error = null;
      }, 2500);
      return;
    }
    const user = this.signupForm.value;
    console.log(this.signupForm.value);
    this.authService.register(user.email, user.password, user.name).subscribe(
      response => {
        console.log("Success Response: ");
        console.log(response);
        this.signupForm.reset();
        console.log("URL TO GO: " + localStorage.getItem("redirect_url"));
        if (localStorage.getItem("redirect_url")) {
          this.router.navigate([localStorage.getItem("redirect_url")]);
          localStorage.removeItem("redirect_url");
        } else {
          this.router.navigate(["/home"]);
        }

        this.appComp.isLogged = true;
      },
      errorMessage => {
        console.log("Error Response: ");
        console.log(errorMessage);
        console.log("Signup Failed");
        this.error = errorMessage;
        setTimeout(() => {
          this.error = null;
        }, 2500);
      }
    );
  }
}
