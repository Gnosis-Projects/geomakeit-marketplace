// Import Injectable, HttpClient and HttpHeaders
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating } from 'src/models/interfaces/rating.interface';


@Injectable({
  providedIn: 'root'
})
export class RatingService {

  baseUrl = environment.backEndUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  addRating(rating: Rating): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Game/AddRating', rating, { headers: this.headers });
  }
}
