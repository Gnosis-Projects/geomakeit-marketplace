import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppItemComponent } from './app-list/app-item/app-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const appListElement = createCustomElement(AppListComponent, { injector: this.injector });
    customElements.define('app-list', appListElement);
  }
}
