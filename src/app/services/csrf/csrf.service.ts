import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private currentCsrfStatusSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.currentCsrfStatusSubject = new BehaviorSubject<boolean>(false);
  }

  getToken() {
    this.currentCsrfStatusSubject.next(true);
    this.http.get<string>(`${environment.apiUrl}/getToken`).subscribe();
  }

  getCsrfStatus() {
    return this.currentCsrfStatusSubject.value;
  }
}
