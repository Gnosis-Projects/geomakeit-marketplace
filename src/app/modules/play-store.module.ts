import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {GameListComponent} from "./game-list/game-list.component";
import { GameCardComponent } from './game-list/game-card/game-card.component';



@NgModule({
  declarations: [
    GameListComponent,
    HomeComponent,
    GameListComponent,
    GameCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayStoreModule { }
