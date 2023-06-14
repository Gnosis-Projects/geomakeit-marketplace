import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {GameDetails} from "../../models/interfaces/game-details.interface";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import { Game_List } from 'src/models/interfaces/game-list.interface';

@Injectable({
  providedIn: 'root'
})
export class GetGamesService {

  baseUrl = '/api/StudioComm';

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

getGames(): Observable<Game_List[]> {
  return this.http.get<Game_List[]>(this.baseUrl + '/List')
    .pipe(catchError(error => {
      this.toastrService.error('Error while fetching list of games!');
      return throwError(error);
  }));
}



  getGameDetails(id: number) {
    return this.http.get(this.baseUrl + '/GetGameByID/' + id);
  }


}
