import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../login/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  private url: string;
  constructor(private router: Router, private authService: AuthService) {}

  private handleAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }

  private handleNotAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes("login")) {
      return true;
    }
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.url = state.url;
    if (this.authService.isAuthenticated()) {
      return this.handleAuthState();
    }
    return this.handleNotAuthState();
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | Observable<boolean> | Promise<any> {
  //   let isAuth;
  //   if (localStorage.getItem("token")) {
  //     isAuth = true;
  //   }
  //   if (!isAuth) {
  //     this.router.navigate(["/login"]);
  //   }
  //   return isAuth;
  // }
}
