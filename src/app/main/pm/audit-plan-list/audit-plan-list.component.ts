import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-audit-plan-list',
  templateUrl: './audit-plan-list.component.html',
  styleUrls: ['./audit-plan-list.component.css']
})
export class AuditPlanListComponent implements OnInit {
  constructor(private router: Router, private pmService: PmService, private authService: AuthService) {}
  auditPlan = [];
  projects = [];
  projectFilter = null;
  filterPlan = [];
  sortValue = null;
  sortName = null;
  displayData = [];
  me;

  ngOnInit() {
    this.getAuth()
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

  handleStatus(status) {
    switch (status) {
      case '0':
        return `PM Reject`;
      case '1':
        return `Waiting QAM, PM Approve`;
      case '2':
        return `Waiting PM Approve`;
      case '3':
        return `Waiting PM Approve`;
      default:
        return status;
    }
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search1();
  }

  search1(): void {
    /** sort data **/
    const data = [...this.filterPlan];
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

  
  getAuth() {
    this.authService.getMe().subscribe(
      res => {
        this.me = res;
        console.log(this.me)
      },
      err => console.log("err", err)
    );
  }

  getListAuditPlan() {
    this.pmService.getListAuditPlan().subscribe(
      res => {
        if (res['code'] === 1) {
          this.auditPlan = res['data'];
          this.auditPlan.map((item, i) => (item.index = i));
          this.filterPlan = [...this.auditPlan];
          this.displayData = [...this.filterPlan];
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
