import { Pipe, PipeTransform } from '@angular/core';
import { Game_List } from 'src/models/interfaces/game-list.interface';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe  implements PipeTransform {

  transform(value: Game_List[], category: string): Game_List[] {
  return value.filter(game => game.category === category);
  }
 
 }
