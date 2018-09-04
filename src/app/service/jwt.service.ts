import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwt from 'angular2-jwt-simple';

@Injectable()
export class JwtService {

  client_key: String;
  client_secret: String;
  iat: Number;
  exp: Number;
  token: any;
  encode: any;
  decode: any;
  obj = {grant_type : 'urn:ietf:params:oauth:grant-type:jwt-bearer'};

  private headers = new Headers(
    { 'Content-Type': 'application/x-www-form-urlencoded'
  });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
    this.client_secret = '0f102e2a2e17818d3180b13716d1df3c459515c7';
    this.client_key = '642f41619475e76cacac68231f935b54dd14a6c4';
  }

  generateEncodedToken(fn: (clientList: any) => void) {
    this.iat = Math.round(new Date().getTime() / 1000);
    this.exp = Math.round(new Date().getTime() / 1000) + (5 * 60);
    this.token = {
      'iss': this.client_key,
      'aud': 'https://logs.thinkpowersolutions.com/exzact/api/oauth/token',
      'exp': this.exp,
      'iat': this.iat
    };
    this.encode = jwt.encode(this.token, this.client_secret);
    console.log(this.token);
    // this.obj['assertion'] = this.encode;
    // fn(this.http.post('api/oauth/token', this.obj).pipe(map(res => res.json())));
     fn(this.encode);
    // this.decode = jwt.decode(this.encode, this.client_secret);
  }

}
