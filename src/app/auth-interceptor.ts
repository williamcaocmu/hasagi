import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./login/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization:"Bearer " + authToken
        }
      });
    }

    return next.handle(req);
  }
}
