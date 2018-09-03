import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'LOGs';

  constructor(public appRouter: Router) { }

  ngOnInit() {
  }

  tokenClickHandler() {
    this.appRouter.navigate(['/token']);
  }

  userClickHandler() {
    this.appRouter.navigate(['/user']);
  }

  homeClickHandler() {
    this.appRouter.navigate(['/home']);
  }

  formClickHandler() {
    this.appRouter.navigate(['/form']);
  }
}
