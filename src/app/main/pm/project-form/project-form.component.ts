import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PmService } from '../pm.service';
import * as format from 'date-fns';
import { AuthService } from 'src/app/login/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  editMode = false;
  selectedQAM = '';
  selectedQAO = [];
  selectedPM = '';

  listOfOption = [];
  rangeDate = [];
  qamList = [];
  qaoList = [];
  pmList = [];
  project = {
    name: '',
    description: '',
    type: '',
    qam: {},
    qao: [],
    start: null,
    end: null,
    pm: '',
    role: ''
  };

  me;

  constructor(
    private router: Router,
    private location: Location,
    private pmService: PmService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private noti: NotificationService
  ) {}

  async ngOnInit() {
    await this.getAuth();
    await this.getQA();
    this.activatedRoute.params.subscribe(param => {
      if (param['id'] && param['id'] !== 'add') {
        this.editMode = true;
        this.getDetail(param['id']);
      }
    });
  }

  getAuth() {
    this.authService.getMe().subscribe(
      res => {
        this.me = res;
      },
      err => console.log('err', err)
    );
  }

  getDetail(id) {
    this.pmService.getDetailProject(id).subscribe(
      res => {
        if (res['code'] === 1) {
          this.project.role = res['data']['project']['role'];
          if (this.project.role === 'admin') {
            this.selectedPM = res['data'].pm[0].id;
          }
          if (this.project.role === 'pm') {
            this.selectedQAM = res['data'].qam[0].id;
            let data = res['data'].qao.map(item => {
              return item.id;
            });
            this.selectedQAO = data;
            console.log(res['data']);
            this.project.qam =
              res['data'].project.qam &&
              res['data'].project.qam[0] &&
              res['data'].project.qam[0].id;
            this.project.qao = res['data'].project.qao.map(item => item.id);
            this.selectedQAM = this.project.qam as any;
            this.selectedQAO = this.project.qao;
          }
          this.project = res['data'].project;
          this.rangeDate = [res['data'].project.start, res['data'].project.end];
        }
      },
      err => console.log('err', err)
    );
  }

  createProject() {
    this.project.qam = this.selectedQAM;
    this.project.qao = this.selectedQAO;
    this.project.pm = this.selectedPM;
    this.pmService.createProjectApi(this.project).subscribe(
      res => {
        if (res['code'] === 1) {
          this.router.navigate(['/main/pm/manage-projects']);
        } else if (res['code'] === 0) {
          this.noti.show('error', 'Error', 'Action Fail !!');
        }
      },
      err => console.log('err', err)
    );
  }

  updateProject() {
    if (this.project.role === 'admin') {
      this.project.pm = this.selectedPM;
      this.pmService.updateProjectApi(this.project).subscribe(
        res => {
          if (res['code'] === 1) {
            this.router.navigate(['/main/pm/manage-projects']);
          } else if (res['code'] === 0) {
            this.noti.show('error', 'Error', 'Action Fail !!');
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.project.role === 'pm') {
      this.project.qam = this.selectedQAM;
      this.project.qao = this.selectedQAO;
      console.log('pm ', this.project);
      this.pmService.updateProjectPMApi(this.project).subscribe(
        res => {
          if (res['code'] === 1) {
            this.router.navigate(['/main/pm/manage-projects']);
          }
        },
        err => {
          console.log(err);
        }
      );
      console.log(this.project);
    }
  }

  getQA() {
    this.pmService.getAccInfo().subscribe(
      res => {
        if (res['code'] === 1) {
          this.pmList = res['data']['pm'];
          this.qaoList = res['data']['qao'];
          this.qamList = res['data']['qam'];
        }
      },
      err => console.log('err', err)
    );
  }

  goBack() {
    this.location.back();
  }

  onChange(result: Date[]): void {
    this.project.start = format.format(result[0], 'MM/DD/YYYY');
    this.project.end = format.format(result[1], 'MM/DD/YYYY');
  }

  resetForm(projectForm: NgForm) {
    projectForm.reset();
  }
}
