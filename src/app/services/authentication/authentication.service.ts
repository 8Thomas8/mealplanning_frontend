import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CurrentUser} from '../../models/current-user';
import {CsrfService} from '../csrf/csrf.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;

  constructor(private http: HttpClient, private csrfService: CsrfService) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set(this.csrfService.getCsrfHeaderName(), this.csrfService.getCsrfToken())
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
        .set(this.csrfService.getCsrfHeaderName(), this.csrfService.getCsrfToken())
    };

    this.currentUserSubject.next(null);
    return this.http.post(`${environment.apiUrl}/logout`, null, options);
  }

  register() {
    const options = {
      headers: new HttpHeaders().set(this.csrfService.getCsrfHeaderName(), this.csrfService.getCsrfToken())
    };
  }
}
