import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CurrentUser} from '../../models/current-user';
import {CookieService} from 'ngx-cookie-service';

const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
const CSRF_HEADER_NAME = 'X-XSRF-TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;
  private currentCsrfTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set(CSRF_HEADER_NAME, this.getCsrfToken())
    };

    return this.http.post(`${environment.apiUrl}/login`, body.toString(), options);
  }

  getLogged() {
    return this.http.get<CurrentUser>(`${environment.apiUrl}/getLogged`).pipe(map(currentUser => {
        this.currentUserSubject.next(currentUser);
      }
    ));
  }

  logout() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set(CSRF_HEADER_NAME, this.getCsrfToken())
    };

    this.currentUserSubject.next(null);
    return this.http.post(`${environment.apiUrl}/logout`, null, options);
  }

  private updateCsrfToken() {
    this.currentCsrfTokenSubject.next(this.cookieService.get(CSRF_COOKIE_NAME));
  }

  private getCsrfToken() {
    this.updateCsrfToken();
    return this.currentCsrfTokenSubject.getValue();
  }
}
