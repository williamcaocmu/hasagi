import { Component, OnInit } from "@angular/core";
import { AdminServiceService } from "./admin/admin-service.service";
import { AuthService } from "../login/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  public me;

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminServiceService
  ) {}

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.getMe().subscribe(
      res => {
        this.me = res;
      },
      err => console.log("err", err)
    );
  }

  logout() {
    this.adminService
      .logout()
      .subscribe(
        () => this.router.navigate(["/login"]),
        err => this.router.navigate(["/login"])
      );
  }
}
