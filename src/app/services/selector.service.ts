import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class SelectorService {
 private selectedAppSource = new BehaviorSubject(null);
 selectedApp$ = this.selectedAppSource.asObservable();

 private showListSource = new BehaviorSubject(true);
 showList$ = this.showListSource.asObservable();
 
 constructor() { }
 
 selectApp(app: any) {
 this.selectedAppSource.next(app);
 }

 setShowList(value: boolean) {
 this.showListSource.next(value);
 }
}
