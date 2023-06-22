import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentRating } from 'src/models/interfaces/game-details.interface';

@Component({
  selector: 'app-reviews-modal',
  templateUrl: './reviews-modal.component.html',
  styleUrls: ['./reviews-modal.component.css']
})
export class ReviewsModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reviews: CommentRating[] },
    public dialogRef: MatDialogRef<ReviewsModalComponent>
  ) { }

  // This method closes the modal and passes a result value
  close(result: string): void {
    this.dialogRef.close(result);
  }

}
