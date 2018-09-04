import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDirective } from '../home/home.directive';
// import * as _ from 'lodash';
import * as _ from 'underscore';

import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, FormArray, Validators } from '@angular/forms';
import { ElementFields} from '../form-detail/elementFields';
import { SharedService } from '../shared.service';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  refreshTokenForm: FormGroup;
  token: any;
  constructor(public homeBuilder: FormBuilder,
              public tokenRouter: Router,
              public homeDirective: HomeDirective,
              public sharedService: SharedService,
              public jwtService: JwtService
  ) {

    this.refreshTokenForm = homeBuilder.group({
      token: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.jwtService.generateEncodedToken((encodedToken) => {
      console.log('encodedToken');
      console.log(encodedToken);
      this.homeDirective.getAccessToken(encodedToken, (isSuccess, data) => {
        console.log('data');
        console.log(data);
        if (isSuccess) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('tokenObj', JSON.stringify(data));
          this.tokenRouter.navigate(['/home']);
        }
      });
    });
  }

  // Currently not in use
  refreshTokenClickHandler() {
    this.ngOnInit();
    console.log(this.refreshTokenForm.valid);
    if (this.refreshTokenForm.valid) {
      this.sharedService.saveToken(this.refreshTokenForm.value.token);
      localStorage.setItem('token', this.refreshTokenForm.value.token);
      this.tokenRouter.navigate(['/home']);
    } else {
      // TODO
    }
  }
}
