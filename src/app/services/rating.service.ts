// Import CookieService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating } from 'src/models/interfaces/rating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  baseUrl = environment.backEndUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addRating(rating: Rating): Observable<any> {
    let jwt = this.cookieService.get('jwt');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + jwt
    });
    return this.http.post<any>(this.baseUrl + '/Game/AddRating', rating, { headers: headers });
  }
}
