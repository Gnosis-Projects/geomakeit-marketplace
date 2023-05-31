import { Pipe, PipeTransform } from "@angular/core";

@Pipe ( {
  name: "sortByAverageRating"
})
export class SortByAverageRatingPipe implements PipeTransform {

  transform (array: any[], direction: string = 'asc'): any [] {
    if (!array) {
      return array;
    }
    const multiplier = direction === 'asc' ? 1 : -1; // setting the sort order
    return array.sort ( (a: any, b: any) => {
      // calculating the average rating of the reviews for each app
      const averageA = this.getAverageRating (a.reviews);
      const averageB = this.getAverageRating (b.reviews);
      // comparing the averages
      return (averageA - averageB) * multiplier;
    });
  }

  // helper function to get the average rating of an array of reviews
  getAverageRating (reviews: any[]): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    // getting the sum of the ratings
    const sum = reviews.reduce ( (acc, review) => acc + review.rating, 0);
    // getting the count of the reviews
    const count = reviews.length;
    // returning the average
    return sum / count;
  }
}
