import { Component } from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showList: boolean = true; // initial value

  constructor(public appListComponent: AppListComponent) { }
  
  onShowListChange(value: boolean) {
    console.log('on show list change parent');
    this.showList = value; // update the parent value
    // do something else based on the value
  }
}
