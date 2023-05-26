import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppItemComponent } from './app-list/app-item/app-item.component';
import { DetailsComponent } from './details/details.component';
import { SelectorService } from './services/selector.service';
import { CategoryFilterPipe } from './shared/pipes/category-filter.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppItemComponent,
    DetailsComponent,
    CategoryFilterPipe
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
