import { Component } from '@angular/core';
import { AppListComponent } from './app-list/app-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showList: boolean = true; // initial value

  title = 'geomakeit-marketplace';
  constructor(public appListComponent: AppListComponent) { }
  
  onShowListChange(value: boolean) {
    console.log('on show list change parent');
    this.showList = value; // update the parent value
    // do something else based on the value
  }
}