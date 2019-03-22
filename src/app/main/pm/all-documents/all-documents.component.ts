import { Component, OnInit } from "@angular/core";
import { PmService } from "../pm.service";

@Component({
  selector: "app-all-documents",
  templateUrl: "./all-documents.component.html",
  styleUrls: ["./all-documents.component.css"]
})
export class AllDocumentsComponent implements OnInit {
  constructor(private pmService: PmService) {}

  documents = [];
  projects = []
  selectedProject = ""

  ngOnInit() {
    this.getAllDocuments();
    this.getAllProjects();
  }

  getAllDocuments(selectedProject = "all") {
    this.pmService.getAllDocumentAPI(selectedProject).subscribe(
      res => {
        if (res["code"] === 1) {
          this.documents = [
            ...res["qam"],
            ...res["reviewer"],
            ...res["uploader"]
          ];
        }
      },
      err => console.log("err", err)
    );
  }

  getAllProjects() {
    this.pmService.getAllProjects().subscribe(
      res => {
        console.log("res", res);
        if (res["code"] === 1) {
          this.projects = res['data']
        }
      },
      err => console.log("err", err)
    );
  }

  search(){
    this.getAllDocuments(this.selectedProject)
  }
}
