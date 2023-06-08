import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Lightbox } from 'ngx-lightbox';
import { App } from 'src/models/interfaces/app-interface';


@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

 starRating = 0;
 selectedApp:any;
 lightboxImages = [];

 slideConfig = {
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
 };

 @ViewChild('slickModal') slickModal!: SlickCarouselComponent;


 constructor(private appService: SelectorService,private lightbox: Lightbox) {
  
  }
 
 ngOnInit(): void {
  console.log("initilized")
 this.appService.selectedApp$.subscribe(app => {
 this.selectedApp = app;
 });
 console.log(this.selectedApp)
 }
 openLightbox(index: number): void {
  this.lightbox.open(this.lightboxImages, index);
}
prepareImages(): void {
  // Assuming selectedApp.screenshots is an array of image URLs
  this.lightboxImages = this.selectedApp.screenshots.map((url: string) => {
    return {
      src: url,
      caption: 'Image caption',
      thumb: url,
    };
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

 goBack() {
  this.appService.setShowList(true);
}
}
