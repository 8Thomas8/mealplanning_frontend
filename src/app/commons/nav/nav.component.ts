import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {CurrentUser} from '../../models/current-user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  currentUser: CurrentUser;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);

  }
  onLogout() {
    const logout = this.authenticationService.logout().toPromise();

    logout.then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
