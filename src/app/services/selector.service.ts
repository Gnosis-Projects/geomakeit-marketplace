import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class SelectorService {
 private selectedAppSource = new BehaviorSubject<number | null> (null); 
 public selectedApp$ = this.selectedAppSource.asObservable();
 private showListSource = new BehaviorSubject(true);
 showList$ = this.showListSource.asObservable();
 
 constructor() { }
 
 selectApp(app_id: number | null) {
 this.selectedAppSource.next(app_id);
 }

 setShowList(value: boolean) {
 this.showListSource.next(value);
 }
}

