import { Component, OnInit } from "@angular/core";
import { AdminServiceService } from "../admin-service.service";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-account",
  templateUrl: "./manage-account.component.html",
  styleUrls: ["./manage-account.component.css"]
})
export class ManageAccountComponent implements OnInit {
  loadingTable = false;

  accounts = [];

  constructor(
    private adminService: AdminServiceService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAccounts();
  }

  navigateEdit(id) {
    this.router.navigate([`/main/admin/${id}`]);
  }
  removeAccount() {
    console.log("remove account");
    this.notification.showDeleteModal(() =>
      this.adminService
        .removeAccount("data")
        .subscribe(succcess => console.log("success"), err => console.log(err))
    );
  }

  getAccounts() {
    this.loadingTable = true;
    this.adminService.getAllAccount().subscribe(
      success => {
        if (success["code"] === 1) {
          this.accounts = success["data"];
          this.loadingTable = false;
        }
      },
      err => {
        console.log("err");
        this.loadingTable = false;
      }
    );
  }
}
