import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminServiceService {
  url = `http://cqms.tech/bkcqms/public/api/`;

  constructor(private http: HttpClient) {}

  createAnAccount(account) {
    return this.http.post(this.url + "admin/account/add", account);
  }

  editAccount(data) {
    return this.http.post(`${this.url}admin/account/update`, data);
  }

  removeAccount(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAllAccount() {
    return this.http.get(`${this.url}admin/account/getall`);
  }

  getAnAccount(id) {
    return this.http.get(`${this.url}admin/account/get/${id}`);
  }

  postFile(file) {
    const formData = new FormData();
    formData.append("File", file, file.name);
    return this.http.post(`${this.url}admin/account/import`, formData);
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return this.http.post(
      this.url + "auth/logout",
      // localStorage.getItem("token")
      {}
    );
  }
}
