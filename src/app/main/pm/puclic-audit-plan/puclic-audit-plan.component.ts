import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-puclic-audit-plan',
  templateUrl: './puclic-audit-plan.component.html',
  styleUrls: ['./puclic-audit-plan.component.css']
})
export class PuclicAuditPlanComponent implements OnInit {
  constructor(private router: Router, private pmService: PmService) {}
  auditPlan = [];
  projects = [];
  projectFilter = null;
  filterPlan = [];

  ngOnInit() {
    this.getAll();
    this.getListAuditPlan();
  }

  addAuditPlan() {
    this.router.navigate(['/main/pm/audit-plans/add']);
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

  getListAuditPlan() {
    this.pmService.getListAuditPlan().subscribe(
      res => {
        if (res['code'] === 1) {
          this.auditPlan = res['data'];
          this.auditPlan.map((item, i) => (item.index = i));
          this.filterPlan = [...this.auditPlan];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  navigateEdit(id) {
    this.router.navigate(['/main/pm/audit-plans/' + id]);
  }

  filter(data) {
    if (data === 'all') {
      this.filterPlan = this.auditPlan;
      return;
    }
    this.filterPlan = this.auditPlan.filter(item => {
      return item.project == data;
    });
  }
}
