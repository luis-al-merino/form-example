import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideNavComponent } from './side-nav.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  declarations: [SideNavComponent],
  exports: [
    SideNavComponent,
    BreadcrumbModule
  ]

})
export class SideNavModule { }
