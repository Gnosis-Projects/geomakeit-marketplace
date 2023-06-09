import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { appList } from 'src/models/mockdata/app-list.mock';
import { App } from 'src/models/interfaces/app-interface';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  @Output() showListChange = new EventEmitter<boolean>();

  apps: any;
  showList: boolean = true;
  categories!: string[];
  selectedTabIndex!: number;
  activeCategory: string = '';

  categoriesState: { [key: string]: boolean } = {};

  constructor(private appService: SelectorService) {
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
    this.apps = appList;
    this.showList = true;
    this.categories = [...new Set(this.apps.map((app: App) => app.category))] as string[];
    this.categories.push('All'); // Add 'All' to the categories array
    this.selectedTabIndex = 0;
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
