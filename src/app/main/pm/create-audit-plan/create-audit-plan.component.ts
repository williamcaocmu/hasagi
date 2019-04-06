import { Component, OnInit } from "@angular/core";
import * as format from "date-fns";
import { PmService } from "../pm.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-audit-plan",
  templateUrl: "./create-audit-plan.component.html",
  styleUrls: ["./create-audit-plan.component.css"]
})
export class CreateAuditPlanComponent implements OnInit {
  rangeDate = [];
  projects = [];
  audit = {
    name: "",
    description: "",
    start: null,
    end: null,
    projectid: "",
    checklist: [],
    content: ""
  };
  questions = [
    {
      question: ""
    }
  ];

  constructor(private pmService: PmService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  onChange(result: Date[]): void {
    this.audit.start = format.format(result[0], "MM/DD/YYYY");
    this.audit.end = format.format(result[1], "MM/DD/YYYY");
  }

  addQuestion() {
    this.questions.push({ question: "" });
  }

  createAuditPlan() {
    this.audit.checklist = this.questions.map(item => item.question);
    console.log(this.audit);
    this.pmService.postAudit(this.audit).subscribe(
      res => {
        if (res["code"] === 1) {
          this.router.navigate(["/main/pm/audit-plans"]);
        }
      },
      err => console.log("err", err)
    );
  }

  getAll() {
    this.pmService.getAllProjects().subscribe(
      res => {
        if (res["code"] === 1) {
          this.projects = res["data"];
        }
      },
      err => {
        console.log("err", err);
      }
    );
  }
}
