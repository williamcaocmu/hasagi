import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading = false;
  constructor(private authService: AuthService, private router: Router) {
    if (!!localStorage.getItem("token")) {
      this.router.navigate(["/main"]);
    }
  }
  submitForm() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        this.router.navigate(["/main"]);
        this.loading = false;
      },
      err => {
        console.log("error", err);
        this.loading = true;
      }
    );
  }
  ngOnInit() {
    // const me = this.authService.me
  }
}
