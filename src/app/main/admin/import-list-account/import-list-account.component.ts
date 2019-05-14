import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { AdminServiceService } from '../admin-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-import-list-account',
  templateUrl: './import-list-account.component.html',
  styleUrls: ['./import-list-account.component.css']
})
export class ImportListAccountComponent implements OnInit {
  uploading = false;
  fileList: UploadFile[] = [];
  errors = [];
  loadingTable = false;
  accounts = [];
  sortName = null;
  sortValue = null;
  displayData = [];
  constructor(
    private http: AdminServiceService,
    private notification: NotificationService,
    private adminService: AdminServiceService
  ) {}

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

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  
  handleUpload(): void {
    this.uploading = true;
    this.http.postFile(this.fileList[0]).subscribe(
      res => {
        if (res['code'] === 1) {
          this.uploading = false;
          this.notification.show('success', 'Success', 'Success');
        } else {
          this.uploading = false;
          this.errors = res['error'];
        }
      },
      err => {
        console.log('err', err);
        this.uploading = false;
      }
    );
  }

  getAccounts() {
    this.loadingTable = true;
    this.adminService.getAllAccount().subscribe(
      success => {
        if (success['code'] === 1) {
          this.accounts = success['data'];
          this.loadingTable = false;
          this.displayData = [...this.accounts];
        }
      },
      err => {
        console.log('err');
        this.loadingTable = false;
      }
    );
  }

  ngOnInit() {
    this.getAccounts();
  }
}
