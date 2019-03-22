import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PmService {
  url = `http://cqms.tech/bkcqms/public/api/`;

  constructor(private http: HttpClient) {}

  createProjectApi(data) {
    return this.http.post(`${this.url}admin/project/add`, data);
  }

  updateProjectApi(data) {
    return this.http.post(`${this.url}admin/project/update`, data);
  }

  updateProjectPMApi(data) {
    return this.http.post(`${this.url}all/project/assignmember`, data);
  }

  getDetailProject(id) {
    return this.http.get(`${this.url}all/project/get/${id}`);
  }

  getAccInfo() {
    return this.http.get(`${this.url}all/project/getaccinfo`);
  }

  getAllProjects() {
    return this.http.get(`${this.url}all/project/getall`);
  }

  createDocumentAPI(data) {
    return this.http.post(`${this.url}all/documents/add`, data);
  }

  getReviewersAPI(id) {
    return this.http.get(`${this.url}all/documents/getreviewinfo/${id}`);
  }

  getAllDocuments(projectId){
    return this.http.get(`${this.url}all/documents/getall/${projectId}`)
  }

  getDetailDocument(documentId, role){
    return this.http.get(`${this.url}all/documents/get/${documentId}/${role}`)
  }

  postFile(file){
    let formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(`${this.url}all/documents/middleupload`, formData);
  }

  approveAPI(data){
    return this.http.post(`${this.url}all/documents/update`, data)
  }

  sendCommentAPI(data){
    return this.http.post(`${this.url}all/documents/comment`, data)
  }

  getAllDocumentAPI(param = 'all'){
    //all 
    // id
    return this.http.get(`${this.url}all/documents/getall/${param}`)
  }

  getPublicDocumentsAPI(){
    return this.http.get(`${this.url}all/documents/getallpublish/all`)
  }


}
