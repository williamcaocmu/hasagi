import { Component, OnInit } from "@angular/core";
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { PmService } from "../pm.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-document-form",
  templateUrl: "./document-form.component.html",
  styleUrls: ["./document-form.component.css"]
})
export class DocumentFormComponent implements OnInit {
  uploading = false;
  fileList: UploadFile[] = [];
  errors = [];
  reviewers = [];

  id;

  document = {
    name: "",
    description: "",
    type: "",
    reviewer: "",
    projectid: "",
    fileupload: ""
  };

  constructor(
    private pmService: PmService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.id = param["id"];
      if (this.id) {
        this.pmService.getReviewersAPI(this.id).subscribe(
          res => {
            console.log("res", res);
            if (res["code"] === 1) {
              this.reviewers = res["data"];
            }
          },
          err => console.log("err", err)
        );
      }
    });
  }

  ngOnInit() {}

  createDocument() {
    this.document.projectid = this.id;
    
    this.pmService.createDocumentAPI(this.document).subscribe(
      res => {
        this.goBack()
      },
      err => {
        console.log("err", err);
      }
    );
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    this.pmService.postFile(this.fileList[0]).subscribe(
      res => {
        console.log("res", res);
        if (res["code"] == 1) {
          this.document.fileupload = res["data"];
          this.uploading = false;
        }
      },
      err => {
        console.log("err", err);
        this.uploading = false;
      }
    );
  }

  goBack(){
    this.location.back()
  }

  
}
