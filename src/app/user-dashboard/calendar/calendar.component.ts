import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiSlotService} from '../../services/api/api-slot.service';
import {CreateMealModalService} from '../../services/create-meal-modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Slot} from '../../models/slot';
import {PlanningService} from '../../services/planning.service';
import {Planning} from '../../models/planning';
import {BehaviorSubject, Observable} from 'rxjs';

const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const MOMENT_NAMES = ['Midi', 'Soir'];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  planning: Planning;

  momentNames = MOMENT_NAMES;

  baseDate: Date;
  todayDate: Date;
  days: Date[];

  showCreateModalStatus: boolean;

  slotForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    guestNumber: new FormControl(1, [Validators.required]),
    momentName: new FormControl('', [Validators.required])
  });

  mealForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private apiSlotService: ApiSlotService, private createMealModalService: CreateMealModalService,
              private planningService: PlanningService) {
    this.days = new Array();
    this.getCreateModalStatus();
  }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.baseDate = this.todayDate;
    this.getDaysInMonth(this.baseDate.getMonth(), this.baseDate.getFullYear());
    this.getSelectedPlanning();
  }

  getDaysInMonth(month: number, year: number) {
    this.days = [];
    const date = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth(), 1);
    while (date.getMonth() === month) {
      this.days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
      date.setDate(date.getDate() + 1);
    }
  }

  getMonthName(month: number) {
    return MONTH_NAMES[month - 1];
  }

  getDayName(day: number) {
    return DAY_NAMES[day];
  }

  sortedDays() {
    return this.days.sort((a, b) => a.getDate() - b.getDate());
  }

  upMonth() {
    this.baseDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth() + 1, 1);
    this.getDaysInMonth(this.baseDate.getMonth(), this.baseDate.getFullYear());
  }

  downMonth() {
    this.baseDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth() - 1, 1);
    this.getDaysInMonth(this.baseDate.getMonth(), this.baseDate.getFullYear());
  }

  getGridPos(day: Date) {
    if (day.getDate() === 1) {
      return `grid-column: ${day.getDay()}`;
    }
  }

  getCreateModalStatus() {
    this.createMealModalService.getStatus().subscribe(status => this.showCreateModalStatus = status);
  }

  onClickCreateMeal(moment: string, day: Date) {
    console.log(moment);
    this.createMealModalService.setTrue();
    this.slotForm.get('momentName').setValue(moment);
    this.slotForm.get('date').setValue(day);
  }

  onClose() {
    this.createMealModalService.setFalse();
    this.resetSlotForm();
  }

  onCreateSlot() {
    const newSlot = new Slot();
    newSlot.date = this.slotForm.get('date').value;
    newSlot.guestNumber = this.slotForm.get('guestNumber').value;
    newSlot.momentName = this.slotForm.get('momentName').value;
    newSlot.meals = null;

    const planningUpdated = this.planning;

    if (this.planning.slots === undefined) {
      this.planning.slots = new Array();
    }

    planningUpdated.slots.push(newSlot);
    this.planningService.updateSelectedPlanning(planningUpdated);

    this.onClose();
  }

  getSlot(date: Date, momentName: string) {
    let slotArray: Slot[];
    slotArray = this.planning.slots;
    slotArray = slotArray.filter(slot => {
      slot.date = new Date(slot.date);
      return (slot.date.getFullYear() === date.getFullYear())
        && (slot.date.getMonth() === date.getMonth())
        && (slot.date.getDate() === date.getDate());
    });
    for (const slot of slotArray) {
      if (slot.momentName === momentName) {
        return slot;
      }
    }

    return null;
  }

  getSelectedPlanning() {
    this.planningService.getSelectedPlanning().subscribe(data => this.planning = data);
  }

  private resetSlotForm() {
    this.slotForm.reset();
    this.slotForm.get('guestNumber').setValue(1);
  }
}
