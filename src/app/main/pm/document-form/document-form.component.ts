import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { PmService } from '../pm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {
  uploading = false;
  fileList: UploadFile[] = [];
  errors = [];
  reviewers = [];

  id;

  document = {
    name: '',
    description: '',
    type: '',
    reviewer: '',
    projectid: '',
    fileupload: ''
  };

  constructor(
    private pmService: PmService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private noti: NotificationService
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      if (this.id) {
        this.pmService.getReviewersAPI(this.id).subscribe(
          res => {
            console.log('res', res);
            if (res['code'] === 1) {
              this.reviewers = res['data'];
            }
          },
          err => console.log('err', err)
        );
      }
    });
  }

  ngOnInit() {}

  async createDocument() {
    try {
      await this.handleUpload();
    } catch (error) {
      this.noti.show('error', 'Error', 'Action Fail !!');
    }
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    this.pmService.postFile(this.fileList[0]).subscribe(
      res => {
        if (res['code'] == 1) {
          this.document.fileupload = res['data'];
          this.uploading = false;
          this.document.projectid = this.id;
          this.pmService.createDocumentAPI(this.document).subscribe(
            res => {
              this.goBack();
            },
            err => {
              console.log('err1', err);
              this.uploading = false;
              this.noti.show('error', 'Error', 'Action Fail !!');
            }
          );
        } else {
          this.noti.show('error', 'Error', 'Action Fail !!');
          this.uploading = false;
        }
      },
      err => {
        console.log('err2');
        this.noti.show('error', 'Error', 'Action Fail !!');
        this.uploading = false;
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
