import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from '@interfaces/user-data';
import { Router } from '@angular/router';
import { SignUpService } from '@services/sign-up.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit, OnDestroy {

  userData: UserData;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
    this.subscription = this.signUpService.singUpData$.subscribe( (data: UserData) =>  {
      !!data.name ? this.userData = data : this.goTo('/'); // To avoid direct navigation to step3.
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  confirm() {
    const formData = Object.assign(this.userData, {'confirmed': true});
    this.signUpService.confirmData(this.userData);
    this.signUpService.submitData({});
    this.goTo('/');
  }

}
