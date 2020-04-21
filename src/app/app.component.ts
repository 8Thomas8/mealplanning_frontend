import {Component, OnInit} from '@angular/core';
import {CsrfService} from './services/csrf/csrf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'mealplanning';

  constructor(private csrfService: CsrfService) {
  }

  ngOnInit(): void {
    if (!this.getCsrfStatus()) {
      this.getCsrfToken();
    }
  }

  getCsrfStatus() {
    return this.csrfService.getCsrfStatus();
  }

  getCsrfToken() {
    return this.csrfService.getToken();
  }
}
