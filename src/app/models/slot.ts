import {Meal} from './meal';

export class Slot {
  id?: number;
  date: Date;
  guestNumber: number;
  meals?: Meal[];
}
