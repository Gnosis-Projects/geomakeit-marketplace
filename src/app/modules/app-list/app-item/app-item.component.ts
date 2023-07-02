// this is app-item component
import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/interfaces/games-per-category.interface';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {
  @Input() app!: Game;
  public isHovered: boolean = false;
  public showFullDescription: boolean = false;
  defaultImage: string = "https://studio.geomakeit.gr/be/storage/game_image/game_19/geomakeit-studio.png";
  downLoadImage = environment.drupalUrl + 'assets/img/app-items/downloads.png';

  constructor() { }

  ngOnInit(): void {
  }

  toggleHover() {
    this.isHovered = !this.isHovered;
  }

  onError(event: any) {
    event.target.src = this.defaultImage;
  }
}
