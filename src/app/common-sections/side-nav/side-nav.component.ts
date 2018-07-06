import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  onSignUpProcess = false;
  url: string;
  constructor( private router: Router ) { }

  ngOnInit() {
    this.router.events
      .pipe( filter(event => event instanceof NavigationEnd) )
      .subscribe((route: ActivatedRoute) => {
        this.url = route.url.toString();
        this.onSignUpProcess = this.url.includes('sign-up');
      });
  }
}
