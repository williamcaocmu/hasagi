import { Component, OnInit } from "@angular/core";
import { AdminServiceService } from "./admin/admin-service.service";
import { AuthService } from "../login/auth.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  public me;
  selectedProvince;
  text = "";

  data = [
    {
      name: "All",
      value: "all"
    },
    {
      name: "Template",
      value: "template"
    },
    {
      name: "Checklist",
      value: "checklist"
    },
    { name: "Standard", value: "standard" },
    {
      name: "Best Practice",
      value: "best practice"
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminServiceService
  ) {}

  ngOnInit() {
    this.getAuth();
    this.selectedProvince = this.data[0].value;
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
 

  onKeydown(e) {
    if (e.key === "Enter") {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          text: this.text,
          type: this.selectedProvince
        }
      };
      this.router.navigate(
        ["/main/pm/manage-projects/view/public-document"],
        navigationExtras
      );
    }
  }
}
