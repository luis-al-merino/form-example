import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignUpService } from '@services/sign-up.service';
import { Authentication } from '@interfaces/authentication';
import { UserData } from '@interfaces/user-data';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})

export class Step1Component implements OnInit, OnDestroy {

  authentication: Authentication;
  authenticationForm: FormGroup;
  showPasswd = false;
  private userData: UserData;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signUpService: SignUpService
  ) {
    this.authentication = new Authentication( '', '', '', '');
    this.authenticationForm = fb.group({
      'login': [this.authentication.login, [Validators.required]],
      'email': [this.authentication.email, [Validators.required, Validators.email]],
      'password': [this.authentication.password, [Validators.required]],
      'confirmPassword':
      [this.authentication.confirmPassword, [Validators.required]]
    }, { validator: this.checkMatchingPasswords('password', 'confirmPassword')});
  }

  ngOnInit() {
    this.subscription = this.signUpService.singUpData$.subscribe( (data: UserData) =>  {
      this.userData = data;
      if (!!data.login) {
        this.authenticationForm.patchValue({
          'login': data.login,
          'email': data.email,
          'password': data.password,
          'confirmPassword': data.confirmPassword
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private checkMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  confirm(authentication: Authentication): void {
    const formData = Object.assign(this.userData, authentication);

    this.signUpService.submitData(formData);
    this.router.navigateByUrl('/sign-up/step2');
  }

  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
