import { Component, OnInit, Directive, Output, EventEmitter, ElementRef, HostListener, ViewChild } from '@angular/core';
import { App } from 'src/models/interfaces/app-interface';
import { appList } from 'src/models/mockdata/app-list.mock';
import { SelectorService } from 'src/app/services/selector.service';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    // check if the click target is outside of the element with this directive
    if (!this.elementRef.nativeElement.contains(target)) {
      // emit the clickOutside event
      this.clickOutside.emit();
    }
  }
}


@Component({
 selector: 'app-searchbar',
 templateUrl: './searchbar.component.html',
 styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

 keyword = 'name'; // the name of the property to display in the autocomplete
 apps: App[] = appList;
 searchValue = '';
 filteredApps: App[] = [];
 showDropdown: boolean = false; // initial value
 // use a private variable to store the index
 private _selectedIndex: number = -1;
 // use a ViewChild decorator to access the input element
 @ViewChild('input') inputElement!: ElementRef;

 constructor(private selectorService: SelectorService) { } // inject the service

 ngOnInit(): void {
 this.filteredApps = this.apps;
 }

filterApps() {
  // filter the apps by name
  this.filteredApps = this.apps.filter(app => app.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  // sort the filtered apps by match score
  this.filteredApps.sort((a, b) => {
    // get the match score for each app
    let scoreA = this.getMatchScore(a.name.toLowerCase(), this.searchValue.toLowerCase());
    let scoreB = this.getMatchScore(b.name.toLowerCase(), this.searchValue.toLowerCase());
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


// helper function to get the match score for an app name and an input value
getMatchScore(name: string, value: string): number {
 if (name.startsWith(value)) {
 return 100;
 }
 if (name.includes(value)) {
 return 50;
 }
 return 0;
}

onAppClick(app: App, event: Event) {
  event.preventDefault();
  this.selectorService.selectApp(app);
  this.selectorService.setShowList(false);
  this.showDropdown = false;
  this.searchValue = app.name;
  // use a setTimeout function to delay the clicking of the input element
  setTimeout(() => {
    this.inputElement.nativeElement.click();
  }, 2000); // adjust the delay as needed
}

onBlur() {
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
  // handle the arrow keys, the enter key and the escape key
  switch (event.key) {
    case 'ArrowDown':
      // increment the selectedIndex if it is less than the length of the filteredApps
      if (this.selectedIndex < this.filteredApps.length - 1) {
        this.selectedIndex++;
      }
      break;
    case 'ArrowUp':
      // decrement the selectedIndex if it is greater than -1
      if (this.selectedIndex > -1) {
        this.selectedIndex--;
      }
      break;
    case 'Enter':
      // trigger the onAppClick method for the selected option if it exists
      if (this.selectedIndex > -1 && this.selectedIndex < this.filteredApps.length) {
        let app = this.filteredApps[this.selectedIndex];
        this.onAppClick(app, new Event('dummy'));
      }
      break;
    case 'Escape':
      // hide the dropdown list
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
    this.searchValue = app.name;
  }
}
}
