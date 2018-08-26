import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  // constructor() { }
  @Input() public message: String;
  @Input() public formElementDetailData: any;
  @Input() public title: String;

  constructor() {
    this.title = 'No title!';
    this.message = 'Message Unavailable!';
  }

  ngOnInit() {
  }

}
