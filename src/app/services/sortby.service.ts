import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], property: string): any[] {
    return value.sort((a, b) => b[property] - a[property]);
  }

}