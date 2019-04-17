import { Component, OnInit } from '@angular/core';
import { PmService } from '../pm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tailor',
  templateUrl: './manage-tailor.component.html',
  styleUrls: ['./manage-tailor.component.css']
})
export class ManageTailorComponent implements OnInit {
  tailors = [];
  projects = [];

  constructor(private pmService: PmService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.pmService.getTailor().subscribe(
      res => {
        if (res['code'] === 1) {
          console.log(res['data']);
          this.projects = res['data'];
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }

  navigateView(id) {
    this.router.navigate(['/main/pm/type/' + id]);
  }
}
