import { Component, OnInit } from "@angular/core";
import { AdminServiceService } from "../admin-service.service";
import { NotificationService } from "src/app/services/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-add-new-account",
  templateUrl: "./add-new-account.component.html",
  styleUrls: ["./add-new-account.component.css"]
})
export class AddNewAccountComponent implements OnInit {
  constructor(
    private adminService: AdminServiceService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  editMode = false;

  account = {
    name: "",
    email: "",
    password: "",
    role: null,
    staffid: "",
    status: false
  };

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param["id"]) {
        this.editMode = true;
        this.getAnAccount(param["id"]);
      }
    });
  }

  createAccount() {
    const { name, email, password, role, staffid } = this.account;
    this.adminService
      .createAnAccount({
        name,
        email,
        password,
        role,
        staffid
      })
      .subscribe(
        res => {
          // console.log(res)
          if (res["code"] === 1) {
            this.notificationService.show("success", "Success", "Add Success");
          } else {
            let emailError = res["message"].email;
            let staffIdError = res["message"].staffid;
            emailError
              ? this.notificationService.show(
                  "error",
                  "Email Error",
                  `${emailError ? emailError : ""}`
                )
              : null;

            staffIdError
              ? this.notificationService.show(
                  "error",
                  "Email Error",
                  `${staffIdError ? staffIdError : ""}  `
                )
              : null;
          }
        },
        err => console.log("err", err)
      );
  }

  getAnAccount(id) {
    this.adminService.getAnAccount(id).subscribe(res => {
      if (res["code"] === 1) {
        this.account = res["data"];
        this.account["id"] = id;
      }
    });
  }

  editAccount() {
    this.adminService.editAccount(this.account).subscribe(res => {
      console.log(res);
      if (res["code"] === 1) {
        this.router.navigate(["/main/admin/manage-account"]);
      }
    });
  }

  navigate(){
    this.location.back()
  }
}
