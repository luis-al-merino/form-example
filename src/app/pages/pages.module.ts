import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    SignUpModule
  ],
  declarations: []
})
export class PagesModule { }
