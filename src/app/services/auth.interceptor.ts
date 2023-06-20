import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  requestWithAuth: any;

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add Bearer token in every request //
    const token: string = this.cookieService.get('token');
    this.requestWithAuth = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      }
    })

    return next.handle(this.requestWithAuth)
  }
}
