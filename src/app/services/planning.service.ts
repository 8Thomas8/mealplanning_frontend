import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Planning} from '../models/planning';
import {ApiPlanningService} from './api/api-planning.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private currentPlannings: BehaviorSubject<Planning[]>;

  constructor(private apiPlanningService: ApiPlanningService) {
    this.currentPlannings = new BehaviorSubject<Planning[]>(null);
    this.getPlannings();
  }

  getPlannings() {
    this.apiPlanningService.getAll().subscribe(data => this.currentPlannings.next(data.content));
  }

  showPlannings() {
    return this.currentPlannings;
  }

  addPlanning(planning: Planning) {
    this.apiPlanningService.create(planning).subscribe();
    const plannings = this.currentPlannings.getValue();
    plannings.push(planning);
    this.currentPlannings.next(plannings);
  }


}
