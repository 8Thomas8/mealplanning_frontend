import {Component, OnInit} from '@angular/core';
import {CreatePlanningModalService} from '../../services/create-planning-modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Planning} from '../../models/planning';
import {PlanningService} from '../../services/planning.service';

const ERROR_EMPTY = 'Vous devez entrer une valeur';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.sass']
})
export class DashboardContentComponent implements OnInit {
  showCreateModalStatus: boolean;
  selectedPlanning: Planning;

  newPlanningForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private createPlanningModalService: CreatePlanningModalService, private planningService: PlanningService) {
  }

  ngOnInit(): void {
    this.getCreateModalStatus();
    this.getSelectedPlanning();
  }

  getCreateModalStatus() {
    this.createPlanningModalService.getStatus().subscribe(status => this.showCreateModalStatus = status);
  }

  getNameErrorMessage() {
    if (this.newPlanningForm.get('name').hasError('required')) {
      return ERROR_EMPTY;
    }
  }

  onCreate() {
    if (this.newPlanningForm.invalid) {
      return;
    }

    const planning = new Planning();
    planning.name = this.newPlanningForm.get('name').value;
    planning.slots = new Array();

    this.planningService.addPlanning(planning);

    this.onClose();
  }

  onClose() {
    this.newPlanningForm.reset();
    this.createPlanningModalService.setFalse();
  }

  getSelectedPlanning() {
    this.planningService.getSelectedPlanning().subscribe(planning => this.selectedPlanning = planning);
  }

  // onDeletePlanning(selectedPlanning: Planning) {
  //   this.planningService.delete(selectedPlanning);
  //   this.selectedPlanning = null;
  // }
}
