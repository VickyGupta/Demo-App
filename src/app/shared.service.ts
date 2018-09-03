import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {

  @Output() public fire = new EventEmitter();
  sharedData: any;
  token: string;
  sharingData: any = {};

  constructor() { }


  saveData( obj ) {
    console.log('save data function called');
    this.sharingData = obj;
  }

  getData() {
    console.log('get data function called');
    return this.sharingData;
  }

  saveToken( token ) {
    console.log('save token data function called');
    this.token = token;
  }

  getToken() {
    console.log('get token data function called');
    console.log(this.token);
    return this.token;
  }

}

