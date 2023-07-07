import {
  Component,
  OnInit,
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Game_List } from 'src/models/interfaces/game-list.interface';
import { SelectorService } from 'src/app/services/selector.service'; // import the service
import { GetGamesService } from 'src/app/services/get-games.service';
import {Subject, Subscription, takeUntil} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
 selector: 'app-searchbar',
 templateUrl: './searchbar.component.html',
 styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit, OnDestroy {

 games!: Game_List[];
 searchValue = '';
 filteredApps: Game_List[] = [];
 showDropdown: boolean = false; // initial value
 stop$: Subject<boolean> = new Subject<boolean>();
 private _selectedIndex: number = -1;
 @ViewChild('input') inputElement!: ElementRef;
 defaultImage = '/' + environment.drupalUrl + 'assets/img/app-items/default.logo.png';

 
 private subscription!: Subscription;

 constructor(private selectorService: SelectorService,private getGamesService: GetGamesService) { }

 ngOnInit(): void {
    this.getGamesService.getGames().pipe(takeUntil(this.stop$)).subscribe(games => {
        this.games = games;
        this.filteredApps = games;
    });
 }

  ngOnDestroy(): void {
    console.log("hey bro i unsubed in the searchbar");
    this.subscription.unsubscribe();
    this.stop$.next(true);
    this.stop$.unsubscribe();
  }

  filterApps() {
    // filter the games by name
    this.filteredApps = this.games.filter(game => game.title.toLowerCase().includes(this.searchValue.toLowerCase()));
    // sort the filtered games by match score
    this.filteredApps.sort((a, b) => {
      // get the match score for each app
      let scoreA = this.getMatchScore(a.title.toLowerCase(), this.searchValue.toLowerCase());
      let scoreB = this.getMatchScore(b.title.toLowerCase(), this.searchValue.toLowerCase());
      // compare the scores
      if (scoreA > scoreB) {
        return -1; // app A has a higher score, so it comes before app B
      } else if (scoreA < scoreB) {
        return 1; // app B has a higher score, so it comes before app A
      } else {
        return 0; // app A and B have the same score, so they stay in the same order
      }
    });
  }

  getMatchScore(name: string, value: string): number {
     if (name.startsWith(value)) {
     return 100;
     }
     if (name.includes(value)) {
     return 50;
     }
     return 0;
  }

  onAppClick(app: Game_List, event: Event) {
    event.preventDefault();
    this.selectorService.selectApp(app.game_id);
    this.selectorService.setShowList(false);
    this.searchValue = app.title;
    this.onBlur();
  }

  onBlur() {
    console.log("called onblur")
      this.showDropdown = false;
  }

  clearSearch() {
    this.searchValue = '';
    this.showDropdown = false;
  }

  onChange() {
    // update the showDropdown property based on the input value
    if (this.searchValue.trim()) {
      this.showDropdown = true;
    } else {
      this.showDropdown = false;
    }
    // reset the selectedIndex to -1
    this.selectedIndex = -1;
  }

onKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      if (this.selectedIndex < this.filteredApps.length - 1) {
        this.selectedIndex++;
      }
      break;
    case 'ArrowUp':
      if (this.selectedIndex > -1) {
        this.selectedIndex--;
      }
      break;
    case 'Enter':
      if (this.selectedIndex > -1 && this.selectedIndex < this.filteredApps.length) {
        let app = this.filteredApps[this.selectedIndex];
        this.onAppClick(app, event);
      }
      break;
    case 'Escape':
      this.showDropdown = false;
      break;
    default:
      break;
  }
}

  // use a setter and a getter for the selectedIndex property
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(value: number) {
    // update the private variable
    this._selectedIndex = value;
    // update the input value with the selected option if it exists
    if (value > -1 && value < this.filteredApps.length) {
      let app = this.filteredApps[value];
      this.searchValue = app.title;
    }
  }
}
