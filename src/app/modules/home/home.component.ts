import {Component, Input, OnDestroy, Signal} from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';
import { SelectorService } from 'src/app/services/selector.service';
import {CookieService} from "ngx-cookie-service";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import { LoginStatusService } from 'src/app/services/loginstatus.service';
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
             private cookieService: CookieService, private translate: TranslateService,
             private toastrService: ToastrService,private tokenStatus: LoginStatusService) {

 }

 ngOnInit(): void {

   this.translate.setDefaultLang('el');
   this.translate.use(this.language || 'el');
   localStorage.setItem('language', this.language || 'el')

   if (this.jwt) {
    this.cookieService.set('jwt', btoa(this.jwt));
    this.tokenStatus.setJwtStatus(true);
  } else {
    this.tokenStatus.setJwtStatus(false);
  }
 // subscribe to the showList$ observable from the service
   this.selectorService.showList$.pipe(takeUntil(this.stop$)).subscribe(value => {
        this.showList = value;
   });
 };

 ngOnDestroy() {
   this.stop$.next(true);
   this.stop$.unsubscribe();
 }

  onShowListChange(value: boolean) {
 this.showList = value;
 }
}
