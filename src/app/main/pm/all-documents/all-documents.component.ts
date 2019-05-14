import { Component, OnInit } from '@angular/core';
import { PmService } from '../pm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {
  constructor(private pmService: PmService, private router: Router) {}
  sortName = null;
  sortValue = null;

  documents = [];
  projects = [];
  selectedProject = '';
  displayData = [];

  ngOnInit() {
    this.getAllDocuments();
    this.getAllProjects();
  }

  getAllDocuments(selectedProject = 'all') {
    this.pmService.getAllDocumentAPI(selectedProject).subscribe(
      res => {
        if (res['code'] === 1) {
          this.documents = [
            ...res['qam'],
            ...res['reviewer'],
            ...res['uploader']
          ];
          this.displayData = this.documents;
        }
      },
      err => console.log('err', err)
    );
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

  handleStatus(status) {
    switch (status) {
      case '1':
        return `waiting Reviewer`;
      case '2':
        return `on going`;
      case '3':
        return `waiting Reviewer`;
      case '4':
        return `waiting QAM`;
      case '5':
        return `redo document`;
      default:
        return status;
    }
  }

  getAllProjects() {
    this.pmService.getProjectInAuditPlan().subscribe(
      res => {
        if (res['code'] === 1) {
          this.projects = res['data'];
        }
      },
      err => console.log('err', err)
    );
  }

  search() {
    // this.getAllDocuments(this.selectedProject);
    // main/pm/manage-projects/view/27/add
    console.log(this.selectedProject);

    this.router.navigate([
      `main/pm/manage-projects/view/${this.selectedProject}/add`
    ]);
  }
}
