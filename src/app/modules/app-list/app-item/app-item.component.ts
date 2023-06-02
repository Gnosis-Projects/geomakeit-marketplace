import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {
  @Input() app: any;
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
