import {Accompaniment} from './accompaniment';
import {Meat} from './meat';

export class Meal {
  id?: number;
  name: string;
  accompaniments?: Accompaniment[];
  meals?: Meat[];
}
