import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { GetGamesService } from 'src/app/services/get-games.service';
import {map, Observable} from "rxjs";
import {GameDetails} from "../../../models/interfaces/game-details.interface";

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  @Output() showListChange = new EventEmitter<boolean>();
  test: any;
  games$: Observable<GameDetails[]>;
  showList: boolean = true;
  categories$: Observable<string[]>;
  selectedTabIndex!: number;
  activeCategory: string = '';
  categoriesState: { [key: string]: boolean } = {};

  constructor(private appService: SelectorService,private gameService: GetGamesService) {
  }

  toggleCategory(category: string) {
    if (this.activeCategory === category || category === 'All') {
      this.activeCategory = '';
    } else {
      this.activeCategory = category;
    }
  }

  resetCategory() {
    this.activeCategory = '';
  }

  ngOnInit(): void {
    this.showList = true;
    this.getAllGames();
    this.getCategories();
    /*this.categories = [...new Set(this.games.map((game: Game_List) => game.category))] as string[];
    this.categories.push('All');*/
    this.selectedTabIndex = 0;

    // testing the services here to see wtf im doing
   /* this.gameService.getGames().subscribe({
      next: (data: Object) => {
        this.games = data as Game_List[];
        // parse the screenshots property from string to array
        this.games.forEach(game => {
          game.screenshots = JSON.parse(game.screenshots);
        });
      },
      error: (error: any) => {
        console.log("eror fwnazwww")
        console.error(error);
      },
      complete: () => {
        console.log("ektupwnw ta paixnidia apo to get")
        console.log(this.games)
      }
    });*/

  }

  getAllGames() {
    this.games$ = this.gameService.getGames();
  }

  getCategories() {
    this.categories$ = this.games$.pipe(map(games => {
      const categoriesArray: string[] = [];
      games.map(game => categoriesArray.push(JSON.parse(game.category || '')))
      return categoriesArray;
    }))
  }

  selectApp(app: any) {
    this.showList = false;
    this.showListChange.emit(this.showList);
    this.appService.selectApp(app);
  }

  backToList() {
    this.showList = true;
    this.appService.selectApp(null);
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.nextId;
  }

  selectCategory(category: string) {
    // Do something with the selected category
    console.log(category);
  }
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
}
