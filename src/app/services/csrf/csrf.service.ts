import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
const CSRF_HEADER_NAME = 'X-XSRF-TOKEN';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private currentCsrfStatusSubject: BehaviorSubject<boolean>;
  private currentCsrfTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentCsrfStatusSubject = new BehaviorSubject<boolean>(false);
  }

  getFirstToken() {
    this.currentCsrfStatusSubject.next(true);
    this.http.get<string>(`${environment.apiUrl}/getToken`).subscribe();
  }

  csrfStatusToFalse() {
    this.currentCsrfStatusSubject.next(false);
  }

  getCsrfStatus() {
    return this.currentCsrfStatusSubject.value;
  }

  getCsrfHeaderName() {
    return CSRF_HEADER_NAME;
  }

  getCsrfToken() {
    this.updateCsrfToken();
    return this.currentCsrfTokenSubject.getValue();
  }

  private updateCsrfToken() {
    this.currentCsrfTokenSubject.next(this.cookieService.get(CSRF_COOKIE_NAME));
  }
}
