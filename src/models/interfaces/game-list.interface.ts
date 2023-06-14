export interface Game_List {
    game_id: number;
    title: string;
    description: string;
    rating: string;
    date_updated: string;
    image_url: string;
    download_url: string;
    category: string;
    category_id: number;
    screenshots: string;
    downloads: number;
  }
  
  interface Screenshot {
    url: string;
  }
  