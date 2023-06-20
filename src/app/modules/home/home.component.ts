import {Component, Input} from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';
import { SelectorService } from 'src/app/services/selector.service';
// import Input

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent {

 @Input() token?: string;
 showList: boolean = true; // initial value

 constructor(public appListComponent: AppListComponent, private selectorService: SelectorService) { } // inject the service

 ngOnInit(): void {
 // subscribe to the showList$ observable from the service
   this.selectorService.showList$.subscribe(value => {
        this.showList = value;
   });

   console.log('token: ' + this.token)};

 onShowListChange(value: boolean) {
 console.log('on show list change parent');
 this.showList = value;
 }
}
