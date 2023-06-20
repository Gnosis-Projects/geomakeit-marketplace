import { DoBootstrap, Injector, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppListComponent } from './modules/app-list/app-list.component';
import { AppItemComponent } from './modules/app-list/app-item/app-item.component';
import { DetailsComponent } from './modules/details/details.component';
import { SelectorService } from './services/selector.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './modules/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { SearchbarPipe } from './shared/pipes/searchbar.pipe';
import { SearchbarComponent } from './modules/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { ShortNumbersPipe } from './shared/pipes/short-numbers.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './services/error-handler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from "ngx-cookie-service";
import {AuthInterceptor} from "./services/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppItemComponent,
    DetailsComponent,
    HomeComponent,
    SearchbarPipe,
    SearchbarComponent,
    TruncatePipe,
    ShortNumbersPipe,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    NgbModule,
    NgbRatingModule,
    LightboxModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AppListComponent,
    SelectorService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const appListElement = createCustomElement(HomeComponent, { injector: this.injector });
    customElements.define('market-place', appListElement);
  }
}
