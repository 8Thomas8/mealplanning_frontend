import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {CurrentUser} from '../../models/current-user';
import {Router} from '@angular/router';
import {CsrfService} from '../../services/csrf/csrf.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  currentUser: CurrentUser;

  constructor(private authenticationService: AuthenticationService, private router: Router, private csrfService: CsrfService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);

  }

  onLogout() {
    const logout = this.authenticationService.logout().toPromise();

    logout.then(() => {
      this.csrfService.csrfStatusToFalse();
      this.router.navigateByUrl('/login');
    });
  }
}
