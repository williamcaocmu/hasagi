import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-audit-plan-list",
  templateUrl: "./audit-plan-list.component.html",
  styleUrls: ["./audit-plan-list.component.css"]
})
export class AuditPlanListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  addAuditPlan() {
    this.router.navigate(["/main/pm/audit-plans/add"]);
  }

  
}
