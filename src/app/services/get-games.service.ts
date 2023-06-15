import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Game_List } from 'src/models/interfaces/game-list.interface';
import { Category } from 'src/models/interfaces/games-per-category.interface';

@Injectable({
  providedIn: 'root'
})
export class GetGamesService {

  baseUrl = '/api/StudioComm';

  constructor(private http: HttpClient) { }

  // Remove the catchError() operator
  getGames(): Observable<Game_List[]> {
    return this.http.get<Game_List[]>(this.baseUrl + '/List');
  }

  // Remove the catchError() operator
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/ListByCategory');
  }

  // Remove the catchError() operator
  getGameDetails(id: number) {
    return this.http.get(this.baseUrl + '/GetGameByID/' + id);
  }
}
