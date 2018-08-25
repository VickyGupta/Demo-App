import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  refreshTokenForm: FormGroup;

  constructor(public homeBuilder: FormBuilder, public tokenRouter: Router) {

    this.refreshTokenForm = homeBuilder.group({
      token: ['', [
        Validators.required
      ]]
    });

  }

  ngOnInit() {
  }

  refreshTokenClickHandler() {
    if (this.refreshTokenForm.valid) {
      console.log('Successfully set refresh token to localStorage');
      localStorage.setItem('token', this.refreshTokenForm.value.token);
      this.tokenRouter.navigate(['/home']);
      console.log(this.refreshTokenForm.value);
    } else {
      console.log('Failed to set refresh token to localStorage');
    }
  }

}
