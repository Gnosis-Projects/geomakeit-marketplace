import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { GetGamesService } from 'src/app/services/get-games.service';
import {map, Observable} from "rxjs";
import {GameDetails} from "../../../models/interfaces/game-details.interface";
import { Game_List } from 'src/models/interfaces/game-list.interface';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  @Output() showListChange = new EventEmitter<boolean>();
  test: any;
  games$!: Observable<Game_List[]>;
  showList: boolean = true;
  categories$!: Observable<string[]>;
  selectedTabIndex!: number;
  activeCategory: string = '';
  categoriesState: { [key: string]: boolean } = {};

  constructor(private appService: SelectorService,private gameService: GetGamesService) {
  }

  ngOnInit(): void {
    this.showList = true;
    this.getAllGames();
    this.getCategories();
    this.selectedTabIndex = 0;
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

  getAllGames() {
    this.games$ = this.gameService.getGames();
  }

  getCategories() {
    this.categories$ = this.games$.pipe(map(games => {
      const categoriesArray: string[] = [];
      games.map(game => categoriesArray.push(JSON.parse(game.category || '')))
      return categoriesArray;
    }));
  }

  selectApp(game_id: number) {
    this.showList = false;
    this.showListChange.emit(this.showList);
    this.appService.selectApp(game_id);
    console.log(game_id)
    // EDW MESA PERNAW TO GAME OLOKLHRO OXI TO GAME_ID PREPEI NA TO FTIAXW
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
