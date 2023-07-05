import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Lightbox } from 'ngx-lightbox';
import { GameDetails } from 'src/models/interfaces/game-details.interface';
import { GetGamesService } from 'src/app/services/get-games.service';
import {Subscription, take} from 'rxjs';
// Import the MatDialog service and the ReviewsModalComponent
import { MatDialog } from '@angular/material/dialog';
import { ReviewsModalComponent } from './reviews-modal/reviews-modal.component';
import {environment} from "../../../environments/environment";
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/models/interfaces/rating.interface';


@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

 rating: number = 0;
 comment: string = '';
 starRating = 0;
 game_id!: number;
 selectedApp!:GameDetails;
 detailsSubscription!: Subscription;
 selectorSubscription!: Subscription;
 lightboxImages: Array<{ src: string; caption: string; thumb: string; }> = [];
 downloadIcon = '/' + environment.drupalUrl + 'assets/img/app-items/downloads.png';
 defaultAppIcon = '/' + environment.drupalUrl + 'assets/img/app-items/default.logo.png';


 slideConfig = {
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
 };

 @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

 // Inject the MatDialog service in the constructor
 constructor(private appService: SelectorService,private lightbox: Lightbox,private gameService: GetGamesService,private ratingService: RatingService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.selectorSubscription = this.appService.selectedApp$.subscribe(app_id => {
      this.game_id = app_id || 0;
      this.getGameDetails();
    });

  }
  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
    this.selectorSubscription.unsubscribe();
  }

  downloadApp(): void {
    window.open(this.selectedApp.download_url, '_blank');
  }

  getGameDetails(): void {
    this.detailsSubscription = this.gameService.getGameDetails(this.game_id)
      .subscribe(data => {
        this.selectedApp = data;
        if (this.selectedApp && this.selectedApp.screenshots) {
          this.selectedApp.screenshots = JSON.parse(this.selectedApp.screenshots);
        }
                this.prepareImages();
      });
  }

 openLightbox(index: number): void {
  this.lightbox.open(this.lightboxImages, index);
}
prepareImages(): void {
  if (this.selectedApp && this.selectedApp.screenshots) {
    this.lightboxImages = this.selectedApp.screenshots.map((url: string) => {
      return {
        src: url,
        caption: 'Image caption',
        thumb: url,
      };
    }) as { src: string; caption: string; thumb: string; }[];
  }
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

showAllReviews(): void {
  const dialogRef = this.dialog.open(ReviewsModalComponent, {
    width: '80%',
    data: { reviews: this.selectedApp.comments_ratings }
  });
}
submitReview() {
  // Check if the comment and rating are not empty
  if (this.selectedApp.game_id && this.rating) {
    // Create a rating object with the comment and rating
    let rating: Rating = {
      game_id: this.selectedApp.game_id, // Use the id of the selected app
      rating: this.rating,
      comment: this.comment
    };
    // Call the addRating method of the RatingService with the rating object
    this.ratingService.addRating(rating).pipe(take(1)).subscribe(
      data => {
        console.log(data);
        this.comment = '';
        this.rating = 0;
      }
    );

    }
  }
}
