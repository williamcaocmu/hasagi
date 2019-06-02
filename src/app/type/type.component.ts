import { Component, OnInit } from '@angular/core';
import { PmService } from '../main/pm/pm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  eidtMode = false;
  obj = {};
  name = '';
  array = new Array(42);
  roleUser;
  id;
  objApplies = {};
  constructor(
    private pmService: PmService,
    private activatedRoute: ActivatedRoute,
    private noti: NotificationService,
    private router: Router
  ) {
    this.obj = this.createObject();
    this.objApplies = this.createObjApplies();
  }

  projectFilter = null;
  projects = [];
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

  async ngOnInit() {
    await this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this.getTailor(param['id']);
      this.eidtMode = true;
    });
    this.getAll();
  }

  getAll() {
    this.pmService.getAllProjects().subscribe(
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

  getTailor(id) {
    this.pmService.getDetailTailor(id).subscribe(
      res => {
        if (res['code'] === 1) {
          this.obj = res['data'].content;
          this.name = res['data'].name;
          this.projectFilter = res['data'].project;
          this.roleUser = res['role'] === 'true' ? true : false;
          this.objApplies = res['data'].content.applies;
        }
      },
      err => console.log('err')
    );
  }

  submit() {
    let data = {
      name: this.name,
      content: this.obj,
      project: this.projectFilter,
      id: this.id
    };
    this.pmService.postTailor(data).subscribe(
      res => {
        if (res['code'] === 1) {
          this.obj = res['data'];
          this.router.navigate(['main/pm/type']);
        } else if (res['code'] === 0) {
          this.noti.show('error', 'Error', 'Action Fail !!');
        }
      },
      err => this.noti.show('error', 'Error', 'Action Fail !!')
    );
  }
}
