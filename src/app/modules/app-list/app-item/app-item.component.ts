import { Component, Input, OnInit } from '@angular/core';
import { Game_List } from 'src/models/interfaces/game-list.interface';
import { Game } from 'src/models/interfaces/games-per-category.interface';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {
  @Input() app!: Game;
  public isHovered: boolean = false;
  public showFullDescription: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Do something with the app data
  }

  toggleHover() {
    this.isHovered = !this.isHovered;
  }
}