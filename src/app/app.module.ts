import { DoBootstrap, Injector, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppListComponent } from './modules/app-list/app-list.component';
import { AppItemComponent } from './modules/app-list/app-item/app-item.component';
import { DetailsComponent } from './modules/details/details.component';
import { SelectorService } from './services/selector.service';
import { CategoryFilterPipe } from './shared/pipes/category-filter.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './modules/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SortByAverageRatingPipe } from './shared/pipes/sortByAverageRating.pipe';
import { SortByPipe } from './shared/pipes/sortBy.pipe';
import { LightboxModule } from 'ngx-lightbox';






@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppItemComponent,
    DetailsComponent,
    CategoryFilterPipe,
    HomeComponent,
    SortByAverageRatingPipe,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    NgbModule,
    NgbRatingModule,
    LightboxModule,

  ],
  providers: [AppListComponent,SelectorService],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const appListElement = createCustomElement(AppListComponent, { injector: this.injector });
    customElements.define('app-list', appListElement);
  }
}
