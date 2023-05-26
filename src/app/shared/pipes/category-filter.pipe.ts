import { Pipe, PipeTransform } from '@angular/core';
import { App } from 'src/models/interfaces/app-interface';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe  implements PipeTransform {

  transform(value: App[], category: string): App[] {
  return value.filter(app => app.category === category);
  }
 
 }
