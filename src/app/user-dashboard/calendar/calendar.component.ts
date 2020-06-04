import {Component, OnInit} from '@angular/core';
import {ApiSlotService} from '../../services/api/api-slot.service';
import {CreateMealModalService} from '../../services/create-meal-modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Slot} from '../../models/slot';

const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const MOMENT_NAMES = ['Midi', 'Soir'];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
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

  constructor(private apiSlotService: ApiSlotService, private createMealModalService: CreateMealModalService) {
    this.days = new Array();
    this.getCreateModalStatus();
  }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.baseDate = this.todayDate;
    this.getDaysInMonth(this.baseDate.getMonth(), this.baseDate.getFullYear());
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
    return monthNames[month - 1];
  }

  getDayName(day: number) {
    return dayNames[day];
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
    this.createMealModalService.setTrue();
    this.slotForm.get('momentName').setValue(moment);
    this.slotForm.get('date').setValue(day);
  }

  onClose() {
    this.createMealModalService.setFalse();
  }

  onCreateSlot() {
    const newSlot = new Slot();
    newSlot.date = this.slotForm.get('date').value;
    newSlot.guestNumber = this.slotForm.get('guestNumber').value;
    newSlot.momentName = this.slotForm.get('momentName').value;
    newSlot.meals = null;

    this.apiSlotService.create(newSlot).subscribe();
  }
}
