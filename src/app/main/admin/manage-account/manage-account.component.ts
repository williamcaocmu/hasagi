import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  loadingTable = false;

  accounts = [];
  sortName = null;
  sortValue = null;
  displayData = [];

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
    console.log('remove account');
    this.notification.showDeleteModal(() =>
      this.adminService
        .removeAccount('data')
        .subscribe(succcess => console.log('success'), err => console.log(err))
    );
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search1();
  }

  search1(): void {
    /** sort data **/
    const data = [...this.accounts];
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.displayData = data;
    }
  }

  getAccounts() {
    this.loadingTable = true;
    this.adminService.getAllAccount().subscribe(
      success => {
        if (success['code'] === 1) {
          this.accounts = success['data'];
          this.displayData = [...this.accounts];
          this.loadingTable = false;
        }
      },
      err => {
        console.log('err');
        this.loadingTable = false;
      }
    );
  }
}
