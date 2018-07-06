import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PersonalData } from '@interfaces/personal-data';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SignUpService } from '@services/sign-up.service';
import { Subscription } from 'rxjs';
import { UserData } from '@interfaces/user-data';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})

export class Step2Component implements OnInit, OnDestroy {

  personalData: PersonalData;
  personalDataForm: FormGroup;
  showPasswd = false;
  maxTextLength = 512; // @TODO move to constants
  bsConfig: Partial<BsDatepickerConfig>;
  private userData: UserData;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signUpService: SignUpService
  ) {
    this.personalData = new PersonalData( '', '', '');
    this.personalDataForm = fb.group({
      'name': [this.personalData.name, [Validators.required]],
      'dateOfBirth': [this.personalData.dateOfBirth, [Validators.required]],
      'additionalInfo': [this.personalData.additionalInfo, []],
    });
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue'});
  }

  ngOnInit() {
    this.subscription = this.signUpService.singUpData$.subscribe( (data: UserData) =>  {
      !!data.login ? this.userData = data : this.goTo('/'); // To avoid direct navigation to step2.
      if (!!data.name) {
        this.personalDataForm.patchValue({
          'name': data.name,
          'dateOfBirth': data.dateOfBirth.date,
          'additionalInfo': data.additionalInfo
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirm(personalData: PersonalData): void {
    personalData.dateOfBirth = this.convertDate(personalData.dateOfBirth);

    const formData = Object.assign(this.userData, personalData );
    this.signUpService.submitData(formData);

    this.router.navigateByUrl('/sign-up/step3');
  }

  private convertDate(dateOfBirth: string): any {
    const dateAsString = JSON.parse( JSON.stringify(dateOfBirth) );
    const date = new Date(dateAsString);
    return {
      'date': dateOfBirth,
      'day': date.getDate(),
      'month': date.getMonth(),
      'year': date.getFullYear()
    };
  }

  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
