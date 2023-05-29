import { Component } from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';
import { SelectorService } from 'src/app/services/selector.service';
// import Input

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent {

 showList: boolean = true; // initial value

 constructor(public appListComponent: AppListComponent, private appService: SelectorService) { }
 
 ngOnInit(): void {
   this.appService.showList$.subscribe(value => {
     this.showList = value;
   });
 }
 
 onShowListChange(value: boolean) {
   console.log('on show list change parent');
   this.showList = value; 
 }
}

