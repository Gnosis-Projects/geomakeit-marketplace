import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Game_List } from 'src/models/interfaces/game-list.interface';
import {Category, Game} from 'src/models/interfaces/games-per-category.interface';

@Injectable({
  providedIn: 'root'
})
export class GetGamesService {

  baseUrl = '/api/StudioComm';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game_List[]> {
    return this.http.get<Game_List[]>(this.baseUrl + '/List');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/ListByCategory');
  }

  getGameDetails(id: number): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + '/GetGameByID?id=' + id);
  }
}
