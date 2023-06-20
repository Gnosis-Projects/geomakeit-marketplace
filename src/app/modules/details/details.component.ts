import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Lightbox } from 'ngx-lightbox';
import { GameDetails } from 'src/models/interfaces/game-details.interface';
import { GetGamesService } from 'src/app/services/get-games.service';
import { Subscription } from 'rxjs';


@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

 starRating = 0;
 game_id!: number | null;
 selectedApp:any;
 lightboxImages = [];
 detailsSubscription!: Subscription;
 selectorSubscription!: Subscription;

 slideConfig = {
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
 };

 @ViewChild('slickModal') slickModal!: SlickCarouselComponent;


 constructor(private appService: SelectorService,private lightbox: Lightbox,private gameService: GetGamesService) {
  
  }
 
  ngOnInit(): void {
    this.selectorSubscription = this.appService.selectedApp$.subscribe(app_id => {
      this.game_id = app_id;
      this.getGameDetails(); 
    });

  } 
  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
    this.selectorSubscription.unsubscribe();
  }
  getGameDetails(): void {
    this.detailsSubscription = this.gameService.getGameDetails(this.game_id)
      .subscribe(data => {
        this.selectedApp = data;
        this.selectedApp.screenshots = JSON.parse(this.selectedApp.screenshots);
        this.prepareImages();
      });
  }

 openLightbox(index: number): void {
  this.lightbox.open(this.lightboxImages, index);
}
prepareImages(): void {
  this.lightboxImages = this.selectedApp.screenshots.map((url: string) => {
    return {
      src: url,
      caption: 'Image caption',
      thumb: url,
    };
  });
}

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