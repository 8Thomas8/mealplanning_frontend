import { Component, OnInit } from '@angular/core';
import {ApiSlotService} from "../../services/api/api-slot.service";

const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  baseDate: Date;
  todayDate: Date;
  days: Date[];

  modalSlotStatus: boolean;

  constructor(private apiSlotService: ApiSlotService) {
    this.days = new Array();
    this.modalSlotStatus = false;
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

  onClickCreateMeal(moment: string) {
    this.modalSlotStatus = true;
  }
}
