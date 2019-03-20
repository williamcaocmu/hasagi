import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import * as moment from "moment";
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = `http://cqms.tech/bkcqms/public/api/`;
  public me = {
    id: "",
    role: "",
    name: "",
    staffid: ""
  };

  constructor(private http: HttpClient, private router: Router, private notification: NotificationService) {}

  getMe() {
    const token = localStorage.getItem("token");
    if (!!token) {
      return this.http.post(this.url + "auth/me", token);
    }
    return;
  }

  private saveToken(token: any, expiration: any) {
    const now = new Date();
    localStorage.setItem("token", token);
    localStorage.setItem(
      "expiration",
      JSON.stringify(moment(now).unix() + expiration * 1000)
    );
    return token;
  }

  private getExpiration(): number {
    const expTime = +localStorage.getItem("expiration");
    return expTime;
  }

  public login(email, password) {
    let data = { email, password };
    return this.http.post(this.url + "auth/login", data).pipe(
      map(
        (token: any) => {
          if (token["code"] === "1") {
            this.saveToken(
              token["data"]["access_token"],
              token["data"]["expires_in"]
            );
            this.me = token["data"];
          }
          else {
            this.notification.show('error', 'Error', "Login no success")
          }
        },
        err => {
          console.log("err", err);
        }
      )
    );
  }

  // public logout() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("expiration");
  //   return this.http.post(this.url+'auth/logout', {})
  // }

  public isAuthenticated(): boolean {
    const now = new Date();
    const expiredTime = this.getExpiration() - +moment(now).unix();
    if (expiredTime < 0) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    }
    return expiredTime > 0;
  }
}
