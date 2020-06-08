import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Planning} from '../models/planning';
import {ApiPlanningService} from './api/api-planning.service';
import {AuthenticationService} from './authentication/authentication.service';
import {ApiUserService} from './api/api-user.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private readonly currentPlannings: BehaviorSubject<Planning[]>;
  private readonly selectedPlanning: BehaviorSubject<Planning>;
  private userId;

  constructor(private apiPlanningService: ApiPlanningService,
              private apiUserService: ApiUserService,
              private authenticationService: AuthenticationService) {
    this.currentPlannings = new BehaviorSubject<Planning[]>(null);
    this.selectedPlanning = new BehaviorSubject<Planning>(null);
    this.getPlannings();
    this.getUserId();
  }

  getUserId() {
    this.authenticationService.getCurrentUser().subscribe(currentUser => this.userId = currentUser.id);
  }

  getPlannings() {
    this.apiUserService.getOne(this.userId).subscribe(data => {
      const plannings = data.content[0].plannings;
      this.currentPlannings.next(plannings);
    });
  }

  showPlannings() {
    return this.currentPlannings;
  }

  addPlanning(planning: Planning) {
    const addPlanning = this.apiPlanningService.create(planning).toPromise();

    addPlanning.then(newPlanning => {
      const createdPlanning: Planning = newPlanning;

      const user = this.authenticationService.getCurrentUser().getValue();
      const plannings = this.currentPlannings.getValue();

      plannings.push(createdPlanning);
      this.currentPlannings.next(plannings);

      user.plannings = this.currentPlannings.getValue();
      this.apiUserService.updateSelf(this.userId, user).subscribe();
    });
  }

  getSelectedPlanning() {
    return this.selectedPlanning;
  }

  changeSelectedPlanning(planning: Planning) {
    this.selectedPlanning.next(planning);
  }

  delete(selectedPlanning: Planning) {
    const user = this.authenticationService.getCurrentUser().getValue();
    user.plannings = user.plannings.filter(planning => planning.id !== selectedPlanning.id);

    this.currentPlannings.next(user.plannings);
    const updateUser = this.apiUserService.updateSelf(this.userId, user).toPromise();
    updateUser.then(() => this.apiPlanningService.deleteOne(selectedPlanning.id).subscribe());
  }

  updateSelectedPlanning(planning: Planning) {
    let index: number;

    let planningUpdated: Planning;

    for (const elt of this.currentPlannings.getValue()) {
      if (elt.name === planning.name) {
        index = this.currentPlannings.getValue().indexOf(elt);
      }
    }

    let currentPlanning = this.currentPlannings.getValue();
    currentPlanning.splice(index, 1);

    const waitResponse = this.apiPlanningService.update(planning.id,
      planning).toPromise();

    waitResponse.then(response => {
      planningUpdated = response;
      currentPlanning = currentPlanning.splice(index, 0, planningUpdated);
      this.selectedPlanning.next(response);
    });

    this.currentPlannings.next(currentPlanning);
  }
}
