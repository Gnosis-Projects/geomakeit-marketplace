export interface GameDetails {
    game_id: number;
    rating: string;
    title: string;
    image_url: string;
    creator_id: number;
    creator: string;
    created_at: string;
    updated_at: string;
    description: string;
    category_id: number;
    category: string;
    version: string;
    download_url: string;
    screenshots: string[];
    downloads: number;
    comments_ratings: CommentRating[];
  }
  
  interface CommentRating {
    recid: number;
    rating: number;
    date_submitted: string;
    comment: string;
  }
  