import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PmService } from "../pm.service";
import { AuthService } from "src/app/login/auth.service";

@Component({
  selector: "app-manage-projects",
  templateUrl: "./manage-projects.component.html",
  styleUrls: ["./manage-projects.component.css"]
})
export class ManageProjectsComponent implements OnInit {
  constructor(
    private router: Router,
    private pmService: PmService,
    private authService: AuthService
  ) {}
  searchValue = '';
  me;
  projects = [];
  loadingTable = false;

  ngOnInit() {
    this.getAll();
    this.getAuth();
  }

  addProject() {
    this.router.navigate(["/main/pm/manage-projects/add"]);
  }

  getAuth() {
    this.authService.getMe().subscribe(
      res => {
        this.me = res;
        
      },
      err => console.log("err", err)
    );
  }
  getAll() {
    this.loadingTable = true;
    this.pmService.getAllProjects().subscribe(
      res => {
        if (res["code"] === 1) {
          
          this.projects = res["data"];
          this.loadingTable = false;
        }
      },
      err => {
        console.log("err", err);
        this.loadingTable = false;
      }
    );
  }

  navigateEdit(id) {
    this.router.navigate([`/main/pm/manage-projects/${id}`]);
  }

  navigateView(id) {
    this.router.navigate([`/main/pm/manage-projects/view/${id}`]);
  }
}
