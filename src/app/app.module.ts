import { DoBootstrap, Injector, NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppItemComponent,
    DetailsComponent,
    CategoryFilterPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule
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
