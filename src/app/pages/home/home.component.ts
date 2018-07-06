import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignUpService } from '@services/sign-up.service';
import { UserData } from '@interfaces/user-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  confirmed = false;
  userData: UserData;
  private subscription: Subscription;

  constructor(
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
    this.subscription = this.signUpService.userDataConfirmed$.subscribe( (data: UserData) =>  {
      if (!!data.confirmed) {
        this.userData = data;
        this.confirmed = data.confirmed;
      }
    });
    this.signUpService.submitData({}); // To avoid direct navigation to sign-up steps 2 and 3.
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
