import { Component, OnInit } from "@angular/core";
import { PmService } from "../pm.service";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-new-public-document",
  templateUrl: "./new-public-document.component.html",
  styleUrls: ["./new-public-document.component.css"]
})
export class NewPublicDocumentComponent implements OnInit {
  constructor(
    private pmService: PmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.text = this.activatedRoute.queryParams["_value"].text;
    this.type = this.activatedRoute.queryParams["_value"].type;
  }
  documents = [];
  state$;
  text = "";
  type = "";

  ngOnInit() {
    this.getPublicDocument(this.type, this.text);
  }

  ngDoCheck() {
    if (
      this.text !== this.activatedRoute.queryParams["_value"].text ||
      this.type !== this.activatedRoute.queryParams["_value"].type
    ) {
      this.text = this.activatedRoute.queryParams["_value"].text;
      this.type = this.activatedRoute.queryParams["_value"].type;
      this.getPublicDocument(this.type, this.text);
    }
  }

  async getPublicDocument(type, text) {
    this.pmService.getDocumentFromOtherPage(type, text).subscribe(
      res => {
        if (res["code"] === 1) {
          this.documents = res["data"];
        }
      },
      err => {
        console.log("err", err);
      }
    );
  }
}
