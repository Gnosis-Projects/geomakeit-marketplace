import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { GetGamesService } from 'src/app/services/get-games.service';
import {map, Observable, Subject, takeUntil} from "rxjs";
import { Category,Game } from "src/models/interfaces/games-per-category.interface";

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  @Output() showListChange = new EventEmitter<boolean>();
  test: any;
  showList: boolean = true;
  categories$!: Observable<string[]>;
  selectedTabIndex!: number;
  activeCategory: string = '';
  categoriesState: { [key: string]: boolean } = {};
  private destroy$ = new Subject<void>();
  categories!: Category[];
  selectedGames!: Game[];
  allGames!:Game[];



  constructor(private appService: SelectorService,private gameService: GetGamesService) {
  }

  ngOnInit(): void {
    this.showList = true;
    this.getCategories();
    this.selectedTabIndex = 0;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  resetCategory() {
    this.activeCategory = '';
  }
  
  getCategories(): void {
    this.gameService.getCategories().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      {
        next: (categories: Category[]) => {
          this.categories = categories;
          this.allGames = this.categories.flatMap(category=>category.games);
        },
        error: (error) => {
          console.error("Something went wrong when loading the List of Games");
        }
      }
    )
  }

  selectApp(game_id: number) {
    this.showList = false;
    this.showListChange.emit(this.showList);
    this.appService.selectApp(game_id);
  }

  backToList() {
    this.showList = true;
    this.appService.selectApp(null);
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.nextId;
  }

  selectCategory(category: Category) {
    this.activeCategory = category.category;
    this.selectedGames = category.games;
  }

  

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: false,
    infinite: false,
    rows: 2,
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
