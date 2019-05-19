import { Component, OnInit } from '@angular/core';
import { PmService } from '../pm.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-manage-tailor',
  templateUrl: './manage-tailor.component.html',
  styleUrls: ['./manage-tailor.component.css']
})
export class ManageTailorComponent implements OnInit {
  tailors = [];
  projects = [];
  sortName = null;
  sortValue = null;
  displayData = [];
  me

  constructor(private pmService: PmService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.getAuth()
    this.getAll();
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

  getAll() {
    this.pmService.getTailor().subscribe(
      res => {
        if (res['code'] === 1) {
          console.log(res['data']);
          this.projects = res['data'];
          this.projects.map((item, i) => (item.index = i));
          this.displayData = [...this.projects];
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }

  addTailor() {
    this.router.navigate(['/main/pm/type/add']);
  }

  navigateView(id) {
    this.router.navigate(['/main/pm/type/' + id]);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** sort data **/
    const data = [...this.projects];
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
}
