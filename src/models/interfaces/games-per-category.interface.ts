// Define an interface for the game object
export interface Game {
    game_id: number;
    title: string;
    description: string;
    rating: string;
    image_url: string;
    downloads: number;
  }
  
  // Define an interface for the category object
  export interface Category {
    category: string;
    category_id: number;
    games: Game[];
  }