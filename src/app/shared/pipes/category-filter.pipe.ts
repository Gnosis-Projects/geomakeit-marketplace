import { Pipe, PipeTransform } from '@angular/core';
import { GameDetails } from 'src/models/interfaces/game-details.interface';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe  implements PipeTransform {

  transform(value: GameDetails[], category: string): GameDetails[] {
  return value.filter(game => game.category === category);
  }
 
 }
