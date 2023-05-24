import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  // Create a BehaviorSubject to store and emit the selectedApp
  private selectedAppSource = new BehaviorSubject(null);
  // Create an observable to subscribe to the selectedApp changes
  selectedApp$ = this.selectedAppSource.asObservable();
 
  constructor() { }
 
  // Create a method to update the selectedApp
  selectApp(app: any) {
  this.selectedAppSource.next(app);
  }
 }
