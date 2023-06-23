export interface GameDetails {
  game_id?: number;
  rating?: string;
  title?: string;
  image_url?: string;
  creator_id?: number;
  creator?: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
  category_id?: number;
  category?: string;
  version?: string;
  download_url?: string;
  screenshots?: any;
  downloads?: number;
  comments_ratings?: CommentRating[];
  size?: number; 
  startingPoint?: string; 
  package?: string;
  class?: string;
}

export interface CommentRating {
  username:string;
  recid: number;
  rating: number;
  date_submitted: string;
  comment: string;
}
