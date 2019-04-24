import { Component, OnInit } from '@angular/core';
import { PmService } from '../pm.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-public-document',
  templateUrl: './new-public-document.component.html',
  styleUrls: ['./new-public-document.component.css']
})
export class NewPublicDocumentComponent implements OnInit {
  constructor(
    private pmService: PmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.text = this.activatedRoute.queryParams["_value"].text;
    // this.type = this.activatedRoute.queryParams["_value"].type;
  }
  documents = [];
  sortValue = null;
  sortName = null;

  displayData = [];
  text = '';
  type = '';

  ngOnInit() {
    this.getPublicDocument(this.type, this.text);
    this.activatedRoute.queryParams.subscribe(query => {
      this.getPublicDocument(query.type || 'all', query.text || '');
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search1();
  }

  search1(): void {
    /** sort data **/
    const data = [...this.documents];
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

  async getPublicDocument(type, text) {
    this.pmService.getDocumentFromOtherPage(type, text).subscribe(
      res => {
        if (res['code'] === 1) {
          this.documents = res['data'];
          this.displayData = [...this.documents];
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }
}
