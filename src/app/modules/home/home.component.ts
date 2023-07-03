import {Component, Input, OnDestroy, Signal} from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';
import { SelectorService } from 'src/app/services/selector.service';
import {CookieService} from "ngx-cookie-service";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
// import Input

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{

 @Input() token?: string;
 @Input() language?: string;
 showList: boolean = true; // initial value
 stop$: Subject<boolean> = new Subject<boolean>();
 baseUrl = environment.drupalUrl;
 backgroundMapImage = "background-image: url(/" + environment.drupalUrl + "assets/img/main/Background-Map.png); background-size: auto; background-repeat: repeat-x";

 constructor(public appListComponent: AppListComponent, private selectorService: SelectorService,
             private cookieService: CookieService, private translate: TranslateService) {
   this.translate.use(this.language || 'el');
   localStorage.setItem('language', this.language || 'el')

 } // inject the service

 ngOnInit(): void {
   if (this.token) {
     this.cookieService.set('token', this.token);
   }
 // subscribe to the showList$ observable from the service
   this.selectorService.showList$.pipe(takeUntil(this.stop$)).subscribe(value => {
        this.showList = value;
   });
   console.log('token: ' + this.token + ' - '+ 'language: ' + this.language)
 };

 ngOnDestroy() {
   this.stop$.next(true);
   this.stop$.unsubscribe();
 }

  onShowListChange(value: boolean) {
 this.showList = value;
 }
}
