import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

const routes: Routes = [
  { path: 'sign-up',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'step1'
      },
      {
        path: 'step1',
        pathMatch: 'full',
        component: Step1Component,
      },
      {
        path: 'step2',
        pathMatch: 'full',
        component: Step2Component,
      },
      {
        path: 'step3',
        pathMatch: 'full',
        component: Step3Component,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
