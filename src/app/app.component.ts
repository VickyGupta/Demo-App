import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'LOGs';
  toggleToken: Boolean = false;
  toggleUser: Boolean = false;
  toggleForm: Boolean = false;
  toggleHome: Boolean = true;

  constructor(public appRouter: Router) {}

  ngOnInit() {
    this.toggleHome = true;
  }

  toggleTokenClickHandler() {
    // this.toggleUser = false;
    // this.toggleHome = false;
    // this.toggleForm = false;
    this.appRouter.navigate(['/token']);
    // if (this.toggleToken) {
    //   // TODO
    // } else {
    //   this.toggleToken = !this.toggleToken;
    // }
  }

  toggleUserClickHandler() {
    // this.toggleToken = false;
    // this.toggleHome = false;
    // this.toggleForm = false;
    this.appRouter.navigate(['/user']);
    // if (this.toggleUser) {
    //   // TODO
    // } else {
    //   this.toggleUser = !this.toggleUser;
    // }
  }

  toggleHomeClickHandler() {
    // this.toggleToken = false;
    // this.toggleUser = false;
    // this.toggleForm = false;
    this.appRouter.navigate(['/home']);
    // if (this.toggleHome) {
    //   // TODO
    // } else {
    //   this.toggleHome = !this.toggleHome;
    // }
  }

  toggleFormClickHandler() {
    // this.toggleToken = false;
    // this.toggleUser = false;
    // this.toggleHome = false;
    this.appRouter.navigate(['/form']);
    // if (this.toggleForm) {
    //   // TODO
    // } else {
    //   this.toggleForm = !this.toggleForm;
    // }
  }
}
