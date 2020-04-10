import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Route} from '@angular/router';

const VALID_BUTTON_VALUE_CREATE = 'Créer le compte';
const VALID_BUTTON_VALUE_LOGIN = 'Connexion';
const CHANGE_BUTTON_VALUE_CREATE = 'J\'ai déjà un compte';
const CHANGE_BUTTON_VALUE_LOGIN = 'Créer un compte';

const ERROR_EMPTY = 'Vous devez entrer une valeur';
const ERROR_EMAIL_INVALID = 'Ce n\'est un email valide';

const TITLE_CREATE = 'Création de compte';
const TITLE_LOGIN = ' Connexion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  validButtonValue: string = VALID_BUTTON_VALUE_LOGIN;
  changeButtonValue: string = CHANGE_BUTTON_VALUE_LOGIN;
  titleValue: string = TITLE_LOGIN;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
  });

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  getUsernameErrorMessage() {
    if (this.loginForm.get('username').hasError('required')) {
      return ERROR_EMPTY;
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return ERROR_EMPTY;
    }

    return this.loginForm.get('email').hasError('email')
      ? ERROR_EMAIL_INVALID
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.get('password').hasError('required')) {
      return ERROR_EMPTY;
    }
  }

  getPasswordConfirmationErrorMessage() {
    if (this.loginForm.get('passwordConfirmation').hasError('required')) {
      return ERROR_EMPTY;
    }
  }

  changePage() {
    if (this.changeButtonValue === CHANGE_BUTTON_VALUE_CREATE) {
      this.changeButtonValue = CHANGE_BUTTON_VALUE_LOGIN;
      this.validButtonValue = VALID_BUTTON_VALUE_LOGIN;
      this.titleValue = TITLE_LOGIN;
    } else {
      this.changeButtonValue = CHANGE_BUTTON_VALUE_CREATE;
      this.validButtonValue = VALID_BUTTON_VALUE_CREATE;
      this.titleValue = TITLE_CREATE;
    }
  }

  checkIfInLoginPage() {
    if (this.changeButtonValue === CHANGE_BUTTON_VALUE_CREATE) {
      return true;
    }
    return false;
  }

  onClick() {
    if (this.changeButtonValue === CHANGE_BUTTON_VALUE_CREATE) {
      // Appel de la méthode de création de compte
      alert('Création du compte');
    } else {
      // Appel de la méthode de connexion
      this.login();
    }
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.get('name').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
         console.log('ok');
        },
        error => {
          console.log('ko');
        });
  }
}
