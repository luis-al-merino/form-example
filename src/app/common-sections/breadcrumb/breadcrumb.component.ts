import { Component, Input} from '@angular/core';
import { Crumb } from '@interfaces/crumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent {

  readonly crumbs: Crumb[] = [
    {
      url: '/sign-up/step1',
      name: 'Authentication'
    },
    {
      url: '/sign-up/step2',
      name: 'Personal Data'
    },
    {
      url: '/sign-up/step3',
      name: 'Confirmation'
    }
  ];

  @Input() url: string;

  constructor() {}

  isStepAvailable(crumbUrl: string): boolean {
    return +crumbUrl.slice(-1) < +this.url.slice(-1) ? true : false;
  }

  isActive(crumbUrl: string): boolean {
    return +crumbUrl.slice(-1) === +this.url.slice(-1) ? true : false;
  }

}
