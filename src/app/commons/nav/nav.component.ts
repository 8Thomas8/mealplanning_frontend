import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {CurrentUser} from '../../models/current-user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  currentUser: CurrentUser;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);

  }
  onLogout() {
    this.authenticationService.logout().subscribe();
  }
}
