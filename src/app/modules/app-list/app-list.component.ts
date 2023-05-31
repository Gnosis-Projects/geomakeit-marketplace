import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';
import { SortByPipe } from 'src/app/services/sortby.service';
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

  constructor(private appService: SelectorService) {
  }

  ngOnInit(): void {
    // Mock data
    this.apps = appList

    this.showList = true;
    this.categories = [...new Set(this.apps.map((app: App) => app.category))] as string[];
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
}
