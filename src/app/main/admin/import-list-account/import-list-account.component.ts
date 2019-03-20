import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { AdminServiceService } from "../admin-service.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-import-list-account",
  templateUrl: "./import-list-account.component.html",
  styleUrls: ["./import-list-account.component.css"]
})
export class ImportListAccountComponent implements OnInit {
  uploading = false;
  fileList: UploadFile[] = [];
  errors = [];

  constructor(
    private http: AdminServiceService,
    private notification: NotificationService
  ) {}

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  handleUpload(): void {
    this.uploading = true;
    this.http.postFile(this.fileList[0]).subscribe(
      res => {
        if (res["code"] === 1) {
          this.uploading = false;
          this.notification.show("success", "Success", "Import file success");
        } else {
          this.uploading = false;
          this.errors = res["error"];
        }
      },
      err => {
        console.log("err", err);
        this.uploading = false;
      }
    );
  }

  ngOnInit() {}
}
