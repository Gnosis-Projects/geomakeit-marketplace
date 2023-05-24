import { Component, Input, OnInit } from '@angular/core';
import { SelectorService } from '../services/selector.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selectedApp: any;
  
  constructor(private appService: SelectorService) { }
  
  ngOnInit(): void {
  // Subscribe to the selectedApp$ observable from the appService and assign it to the selectedApp variable
  this.appService.selectedApp$.subscribe(app => {
  this.selectedApp = app;
  });
  }
  }