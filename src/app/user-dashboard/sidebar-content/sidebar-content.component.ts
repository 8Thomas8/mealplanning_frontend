import {Component, OnInit} from '@angular/core';
import {Planning} from '../../models/planning';
import {CreatePlanningModalService} from '../../services/create-planning-modal.service';
import {PlanningService} from '../../services/planning.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.sass']
})
export class SidebarContentComponent implements OnInit {

  plannings: Planning[];
  showModalStatus: boolean;

  constructor(private planningService: PlanningService, private createPlanningModalService: CreatePlanningModalService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getCreateModalStatus();
  }

  getAll() {
    this.planningService.showPlannings().subscribe(data => {
      this.plannings = data;
    });
  }

  onCreate() {
    this.createPlanningModalService.setTrue();
  }

  getCreateModalStatus() {
    this.createPlanningModalService.getStatus().subscribe(status => this.showModalStatus = status);
  }

  onSelect(planning: Planning) {
    this.planningService.selectPlanning(planning);
  }
}
