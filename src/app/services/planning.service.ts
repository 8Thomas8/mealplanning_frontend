import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Planning} from '../models/planning';
import {ApiPlanningService} from './api/api-planning.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private readonly currentPlannings: BehaviorSubject<Planning[]>;
  private readonly selectedPlanning: BehaviorSubject<Planning>

  constructor(private apiPlanningService: ApiPlanningService) {
    this.currentPlannings = new BehaviorSubject<Planning[]>(null);
    this.selectedPlanning = new BehaviorSubject<Planning>(null);
    this.getPlannings();
  }

  getPlannings() {
    this.apiPlanningService.getAll().subscribe(data => {
      this.currentPlannings.next(data.content);
    });
  }

  showPlannings() {
    return this.currentPlannings;
  }

  addPlanning(planning: Planning) {
  const addPlanning =  this.apiPlanningService.create(planning).toPromise();
  addPlanning.then(() => this.getPlannings());
  }

  selectPlanning(planning) {
    this.selectedPlanning.next(planning);
  }

  getSelectedPlanning() {
    return this.selectedPlanning;
  }

  delete(selectedPlanning: Planning) {
    const delPlanning = this.apiPlanningService.deleteOne(selectedPlanning.id).toPromise();
    delPlanning.then(() => this.getPlannings());
  }
}
