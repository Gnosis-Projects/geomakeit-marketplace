import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Lightbox } from 'ngx-lightbox';
import { GameDetails } from 'src/models/interfaces/game-details.interface';
import { GetGamesService } from 'src/app/services/get-games.service';
import {Subscription, take} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsModalComponent } from './reviews-modal/reviews-modal.component';
import {environment} from "../../../environments/environment";
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/models/interfaces/rating.interface';
import { ToastrService } from 'ngx-toastr';
import { LoginStatusService } from 'src/app/services/loginstatus.service';


@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

 commentVisible: boolean = false;
 rating: number = 0;
 comment: string = '';
 starRating = 0;
 game_id!: number;
 selectedApp!:GameDetails;
 detailsSubscription!: Subscription;
 selectorSubscription!: Subscription;
 loginstatusSubscription!:Subscription;
 jwtStatus: boolean = false;
 lightboxImages: Array<{ src: string; caption: string; thumb: string; }> = [];
 downloadIcon = '/' + environment.drupalUrl + 'assets/img/app-items/downloads.png';
 defaultAppIcon = '/' + environment.drupalUrl + 'assets/img/app-items/default.logo.png';


 slideConfig = {
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
 };

 @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

 constructor(private appService: SelectorService,
             private lightbox: Lightbox,
             private gameService: GetGamesService,
             private ratingService: RatingService,
             public dialog: MatDialog,
             private toastr: ToastrService,
             private loginStatus: LoginStatusService
             ) {

  }

  ngOnInit(): void {
    this.selectorSubscription = this.appService.selectedApp$
      .pipe(take(1)).subscribe(app_id => {
      this.game_id = app_id || 0;
      this.getGameDetails();
      this.subscribeToLoginstatus();
    });

  }
  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
    this.selectorSubscription.unsubscribe();
    this.loginstatusSubscription.unsubscribe();
  }

  downloadApp(): void {
    window.open(this.selectedApp.download_url, '_blank');
  }
  subscribeToLoginstatus(): void {
    this.loginstatusSubscription = this.loginStatus.jwtStatus$.subscribe(status => {
      this.jwtStatus = status;
    });
  }

showComment() {
  this.commentVisible = true;
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
    height: '85%',
    data: { reviews: this.selectedApp.comments_ratings }
  });
}
submitReview() {
  if (this.selectedApp.game_id && this.rating) {
    let rating: Rating = {
      game_id: this.selectedApp.game_id,
      rating: this.rating,
      comment: this.comment
    };
    this.ratingService.addRating(rating).pipe(take(1)).subscribe(
      data => {
        this.comment = '';
        this.rating = 0;
        this.toastr.success('Your review has been submitted', 'Thank you!');
        this.getGameDetails();
      }
    );

    }
  }
}
