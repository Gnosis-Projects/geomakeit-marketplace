import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectorService } from '../services/selector.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 selectedApp: any;
 slideConfig = {
  slidesToShow: 2,
  slidesToScroll: 2,
  dots: true,
 };

 @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

 constructor(private appService: SelectorService) { }
 
 ngOnInit(): void {
 // Subscribe to the selectedApp$ observable from the appService and assign it to the selectedApp variable
 this.appService.selectedApp$.subscribe(app => {
 this.selectedApp = app;
 });
 }

 // You can use these functions to control the carousel
 slickInit(e:any) {
  console.log('slick initialized');
 }

 breakpoint(e:any) {
  console.log('breakpoint');
 }

 afterChange(e:any) {
  console.log('afterChange');
 }

 beforeChange(e:any) {
  console.log('beforeChange');
 }
}
