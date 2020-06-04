import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateMealModalService {

  private readonly currentStatusSubject: BehaviorSubject<boolean>;

  constructor() {
    this.currentStatusSubject = new BehaviorSubject<boolean>(false);
  }

  setFalse() {
    this.currentStatusSubject.next(false);
  }

  setTrue() {
    this.currentStatusSubject.next(true);
  }


  getStatus() {
    return this.currentStatusSubject;
  }
}
