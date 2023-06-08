export interface App {
    name: string;
    icon: string;
    rating: number;
    description: string;
    screenshots: string[];
    reviews: {user: string; rating: number; comment: string;}[];
    size: string;
    version: string;
    category: string;
    developer: string;
    permissions?: string[]; // make permissions optional
    }