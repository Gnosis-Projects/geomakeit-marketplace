import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  getToken(): string {
     return this.cookieService.get('token') || '';
  }

  setToken(token: string): void {
    this.cookieService.set('token', token || '');
  }

  logout() {

  }
}
