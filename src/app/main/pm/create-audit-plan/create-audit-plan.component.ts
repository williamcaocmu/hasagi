import { Component, OnInit } from '@angular/core';
import * as format from 'date-fns';
import { PmService } from '../pm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-audit-plan',
  templateUrl: './create-audit-plan.component.html',
  styleUrls: ['./create-audit-plan.component.css']
})
export class CreateAuditPlanComponent implements OnInit {
  comment = '';
  editMode = false;
  rangeDate = [];
  projects = [];
  audit = {
    name: '',
    description: '',
    start: null,
    end: null,
    projectid: '',
    checklist: [],
    content: '',
    comments: []
  };
  questions = [
    {
      question: ''
    }
  ];

  permission = {};

  constructor(
    private pmService: PmService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noti: NotificationService,
    private location: Location
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.editMode = true;
        this.pmService.getDetailAuditPlan(param['id']).subscribe(
          res => {
            if (res['code'] === 1) {
              this.audit = res['data'];
              this.questions = res['data'].checklist;
              this.rangeDate = [res['data'].start, res['data'].end];
              this.permission = res['permission'];
              console.log(this.permission);
            }
          },
          err => console.log(err)
        );
      } else {
        this.permission = {
          form: true,
          approve: true
        };
        console.log(this.permission);
      }
    });
    this.getAll();
  }

  onChange(result: Date[]): void {
    this.audit.start = format.format(result[0], 'MM/DD/YYYY');
    this.audit.end = format.format(result[1], 'MM/DD/YYYY');
  }

  addQuestion() {
    this.questions.push({ question: '' });
  }

  goBack() {
    this.location.back();
  }

  createAuditPlan() {
    this.audit.checklist = this.questions.map(item => item.question);
    this.pmService.postAudit(this.audit).subscribe(
      res => {
        if (res['code'] === 1) {
          this.router.navigate(['/main/pm/audit-plans']);
        } else if (res['code'] === 0) {
          this.noti.show('error', 'Error', 'Action Fail !!');
        }
      },
      err => console.log('err', err)
    );
  }

  getAll() {
    this.pmService.getProjectInAuditPlan().subscribe(
      res => {
        console.log(res);
        if (res['code'] === 1) {
          this.projects = res['data'];
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }
  resetForm(projectForm: NgForm) {
    projectForm.reset();
  }

  sendAction(action) {
    this.audit['action'] = action;
    this.pmService.approveAuditAPI(this.audit).subscribe(
      res => {
        if (res['code'] === 1) {
          this.noti.show('success', 'Success', 'Success !!!');
          this.goBack();
        } else if (res['code'] === 0) {
          this.noti.show('error', 'Error', 'Action Fail !!');
        }
      },
      err => console.log('error', err)
    );
  }

  editAuditPlan() {
    this.audit.checklist = this.questions.map(item => item.question);
    this.pmService.approveAuditAPI(this.audit).subscribe(
      res => {
        if (res['code'] === 1) {
          this.router.navigate(['/main/pm/audit-plans']);
        } else if (res['code'] === 0) {
          this.noti.show('error', 'Error', 'Action Fail !!');
        }
      },
      err => console.log('err', err)
    );
  }

  postComment() {
    console.log(this.audit['id']);
    this.pmService
      .commentAuditPlan({
        id: this.audit['id'],
        comment: this.comment
      })
      .subscribe(
        res => {
          this.noti.show('success', 'Success', 'Success !!!');
          this.comment = '';
        },
        err => {
          console.log('error');
        }
      );
  }
}
