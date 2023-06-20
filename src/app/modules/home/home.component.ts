import {Component, Input, Signal} from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';
import { SelectorService } from 'src/app/services/selector.service';
import {CookieService} from "ngx-cookie-service";
import {Subject} from "rxjs";
// import Input

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent {

 @Input() token?: string;
 showList: boolean = true; // initial value
 stop$: Subject<boolean> = new Subject<boolean>();

 constructor(public appListComponent: AppListComponent, private selectorService: SelectorService, private cookieService: CookieService) {

 } // inject the service

 ngOnInit(): void {
   if (this.token) {
     this.cookieService.set('token', this.token);
   }

 // subscribe to the showList$ observable from the service
   this.selectorService.showList$.subscribe(value => {
        this.showList = value;
   });

   console.log('token: ' + this.token)
 };

 onShowListChange(value: boolean) {
 console.log('on show list change parent');
 this.showList = value;
 }
}
