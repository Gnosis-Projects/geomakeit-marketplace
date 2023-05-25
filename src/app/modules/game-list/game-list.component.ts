import { Component } from '@angular/core';
import {of} from "rxjs";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  games$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
}
