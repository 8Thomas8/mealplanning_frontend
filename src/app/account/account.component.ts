import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {CurrentUser} from '../models/current-user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  currentUser: CurrentUser;

  accountForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
  });

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.accountForm.disable();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
      if (currentUser) {
        this.fillForm();
      }
    });
  }

  fillForm() {
    this.accountForm.get('username').setValue(this.currentUser.username);
    this.accountForm.get('email').setValue(this.currentUser.email);

  }

}
