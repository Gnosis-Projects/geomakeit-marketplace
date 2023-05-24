import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  apps: any;

  constructor() { }

  ngOnInit(): void {
    // Mock data
    this.apps = [
      { name: "Alexa", icon: "./assets/img/samples/alexa.png", rating: 4.5 },
      { name: "Disney", icon: "./assets/img/samples/disney.png", rating: 4.7 },
      { name: "DuoLingo", icon: "./assets//img/samples/duolingo.png", rating: 4.2 },
      { name: "Pear", icon: "./assets/img/samples/pear.png", rating: 4.8 }
    ];
  }
}

