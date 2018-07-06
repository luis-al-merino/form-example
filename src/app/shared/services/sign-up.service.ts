import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private signUpDataSource = new BehaviorSubject({});
  private userDataConfirmedSource = new BehaviorSubject({});

  singUpData$ = this.signUpDataSource.asObservable();
  userDataConfirmed$ = this.userDataConfirmedSource.asObservable();

  submitData(formData): void {
    this.signUpDataSource.next(formData);
  }

  confirmData(formData): void {
    this.userDataConfirmedSource.next(formData);
  }
}
