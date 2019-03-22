import { Component, OnInit } from "@angular/core";
import { PmService } from "../pm.service";

@Component({
  selector: "app-new-public-document",
  templateUrl: "./new-public-document.component.html",
  styleUrls: ["./new-public-document.component.css"]
})
export class NewPublicDocumentComponent implements OnInit {
  constructor(private pmService: PmService) {}
  documents= []

  ngOnInit() {
    this.getPublicDocument()
  }

  getPublicDocument() {
    this.pmService.getPublicDocumentsAPI().subscribe(
      res => {
        console.log("res", res);
        if(res['code'] === 1) {
          this.documents =  res['data']
        }
      },
      err => {
        console.log("err", err);
      }
    );
  }
}
