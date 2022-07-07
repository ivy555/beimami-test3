import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthorizationService } from "src/app/services/authorization.service";
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthorizationService,
    private router: Router,
    public appComp: AppComponent
  ) {}

  genders = ["male", "female"];
  loginForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];
  error: string = null;

  ngOnInit() {
    this.authService.showMessage();
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const user = this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService.login(user.email, user.password).subscribe(
      response => {
        console.log("Success Response: ");
        console.log(response);
        this.loginForm.reset();
        this.router.navigate(["/home"]);
        this.appComp.isLogged = true;
      },
      errorMessage => {
        console.log("Error Response: ");
        this.error = errorMessage;
        setTimeout(() => {
          this.error = null;
        }, 3000);
        console.log("Signup Failed");
      }
    );
  }
}
