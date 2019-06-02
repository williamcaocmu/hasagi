import { Component, OnInit } from '@angular/core';
import { PmService } from '../pm.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tailor-form-add',
  templateUrl: './tailor-form-add.component.html',
  styleUrls: ['./tailor-form-add.component.css']
})
export class TailorFormAddComponent implements OnInit {
  obj = {};
  array = new Array(42);
  name = '';
  projectFilter = null;
  projects = [];
  selectedValue = 'Y';
  objAllies = {};

  constructor(
    private pmService: PmService,
    private noti: NotificationService,
    private router: Router
  ) {
    this.obj = this.createObject();
    this.objAllies = this.createObjApplies();
  }

  getAll() {
    this.pmService.getProjectInTailor().subscribe(
      res => {
        if (res['code'] === 1) {
          this.projects = res['data'];
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }

  createObject() {
    const obj = {};
    for (let h = 1; h <= 42; h++) {
      for (let k = 1; k <= 2; k++) {
        obj[`${h}-${k}`] = '';
      }
    }
    return obj;
  }

  createObjApplies() {
    const objAllies = {};
    for (let h = 1; h <= 42; h++) {
      for (let k = 1; k <= 2; k++) {
        objAllies[`${h}-${k}`] = 'Y';
      }
    }
    return objAllies;
  }

  submit() {
    let data = {
      name: this.name,
      content: this.obj,
      project: this.projectFilter
    };
    this.pmService.editTailor(data).subscribe(
      res => {
        if (res['code'] === 1) {
          this.obj = res['data'];
          this.router.navigate(['./main/pm/type']);
        } else if (res['code'] === 0) {
          this.noti.show('error', 'Error', 'Action Fail !!');
        }
      },
      err => this.noti.show('error', 'Error', 'Action Fail !!')
    );
  }

  ngOnInit() {
    this.getAll();
    this.obj['applies'] = this.objAllies;
  }
}
