import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Lightbox } from 'ngx-lightbox';
import { GameDetails } from 'src/models/interfaces/game-details.interface';
import { GetGamesService } from 'src/app/services/get-games.service';


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

 slideConfig = {
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
 };

 @ViewChild('slickModal') slickModal!: SlickCarouselComponent;


 constructor(private appService: SelectorService,private lightbox: Lightbox,private gameService: GetGamesService) {
  
  }
 
  ngOnInit(): void {
    this.appService.selectedApp$.subscribe({
      next: (id: number | null) => {
        console.log('next'); // add this console.log here
        console.log(id); 
        this.game_id = id; 
        if (this.game_id) {
          this.gameService.getGameDetails(this.game_id).subscribe((game: any) => { // game is typed as any
            game.screenshots = JSON.parse(game.screenshots);
            this.selectedApp = game;
            console.log(this.selectedApp); 
          });
          
        }
      }
    });
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