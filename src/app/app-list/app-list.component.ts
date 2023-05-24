import { Component, Injectable, OnInit } from '@angular/core';
import { SelectorService } from '../services/selector.service';

// Add the @Injectable decorator and specify the providedIn option as 'root'
@Injectable({
 providedIn: 'root'
})
@Component({
 selector: 'app-app-list',
 templateUrl: './app-list.component.html',
 styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
 apps: any;
 showList: boolean = true;

 constructor(private appService: SelectorService) { }

 ngOnInit(): void {
 // Mock data
 this.apps = [
 { name: "Alexa", icon: "./assets/img/samples/alexa.png", rating: 4.5 },
 { name: "Disney", icon: "./assets/img/samples/disney.png", rating: 4.7 },
 { name: "DuoLingo", icon: "./assets//img/samples/duolingo.png", rating: 4.2 },
 { name: "Pear", icon: "./assets/img/samples/pear.png", rating: 4.8 }
 ];
 // Initialize showList to true
 this.showList = true;
 }

 selectApp(app: any) {
 // Set showList to false when an app is selected
 this.showList = false;
 // Use the selector service to update the selected app
 this.appService.selectApp(app);
 }

 backToList() {
 // Set showList to true when going back to the list
 this.showList = true;
 // Reset the selected app to null
 this.appService.selectApp(null);
 }
}
