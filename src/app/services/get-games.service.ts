import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Game_List } from 'src/models/interfaces/game-list.interface';
import {Category, Game} from 'src/models/interfaces/games-per-category.interface';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetGamesService {

  baseUrl = environment.backEndUrl;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game_List[]> {
    return this.http.get<Game_List[]>(this.baseUrl + '/StudioComm/List');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/StudioComm/ListByCategory');
  }

  getGameDetails(id: number): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + '/StudioComm/GetGameByID?id=' + id);
  }
}
