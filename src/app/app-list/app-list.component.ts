import { Component, Injectable, OnInit,Output,EventEmitter } from '@angular/core';
import { SelectorService } from '../services/selector.service';
import { appList } from 'src/models/mockdata/app-list.mock';


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

 @Output() showListChange = new EventEmitter<boolean>();

 apps: any;
 showList: boolean = true;

 constructor(private appService: SelectorService) { }

 ngOnInit(): void {
 // Mock data
 this.apps = appList
 // Initialize showList to true
 this.showList = true;
 }

 selectApp(app: any) {
 // Set showList to false when an app is selected
 this.showList = false;
 this.showListChange.emit(this.showList);
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
