import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodecimals'
})
export class NodecimalsPipe implements PipeTransform {

  transform(value?: string): string {
    return value ? value.slice(0, 3) : 'N/A';
  }

}
