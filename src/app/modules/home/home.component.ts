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

 @Input() jwt?: string;
 @Input() language?: string;
 showList: boolean = true; // initial value
 stop$: Subject<boolean> = new Subject<boolean>();
 baseUrl = environment.drupalUrl;
 backgroundMapImage = "background-image: url(/" + environment.drupalUrl + "assets/img/main/Background-Map.png); background-size: 100% 100%; background-repeat: no-repeat";

 constructor(public appListComponent: AppListComponent, private selectorService: SelectorService,
             private cookieService: CookieService, private translate: TranslateService) {

 } // inject the service

 ngOnInit(): void {
   this.translate.setDefaultLang('el');
   this.translate.use(this.language || 'el');
   localStorage.setItem('language', this.language || 'el')
   console.log(this.language, this.jwt)
   if (this.jwt) {

     this.cookieService.set('jwt', btoa(this.jwt));
   }
 // subscribe to the showList$ observable from the service
   this.selectorService.showList$.pipe(takeUntil(this.stop$)).subscribe(value => {
        this.showList = value;
   });
   console.log('jwt: ' + this.jwt + ' - '+ 'language: ' + this.language)
 };

 ngOnDestroy() {
   this.stop$.next(true);
   this.stop$.unsubscribe();
 }

  onShowListChange(value: boolean) {
 this.showList = value;
 }
}
