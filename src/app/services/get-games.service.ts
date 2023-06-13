import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetGamesService {

  constructor(private http: HttpClient) { }

  getGames() {
    const url = '/api/StudioComm/List';
    return this.http.get(url);
  }
  getGameDetails(id: number) {
    const url = `/api/StudioComm/GetGameByID/${id}`;
    return this.http.get(url);
  }
  
  
}
