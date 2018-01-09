import {Component, Inject, OnInit} from '@angular/core';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(@Inject('isBrowser') public isBrowser: boolean) {
  }

  ngOnInit() {
  }

}
