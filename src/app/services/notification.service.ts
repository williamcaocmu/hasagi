import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";
import { NzModalService } from "ng-zorro-antd";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  show(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  showDeleteModal(onOk) {
    this.modal.confirm({
      nzTitle: "Are you sure delete this ?",
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: "Yes",
      nzOkType: "danger",
      nzOnOk: onOk,
      nzCancelText: "No",
      nzOnCancel: () => {}
    });
  }
}
