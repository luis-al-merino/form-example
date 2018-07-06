import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavModule } from './side-nav/side-nav.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  exports: [
    SideNavModule,
  ]
})
export class CommonSectionsModule { }
