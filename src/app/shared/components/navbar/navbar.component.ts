import {Component, Inject, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {CookieService} from '../../services/cookie.service';
import {LANGUAGE_VARIABLE} from '../../../app.config';

@Component({
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

  langs: string[];
  currentLang: string;

  constructor(@Inject('isBrowser') public isBrowser: boolean,
              public translate: TranslateService,
              public _cookie: CookieService) {
  }

  ngOnInit() {
    this.langs = this.translate.langs;
    this.currentLang = this.translate.currentLang;
  }

  public changeLanguage() {
    this.translate.use(this.currentLang);
    this._cookie.setCookie(LANGUAGE_VARIABLE, this.currentLang);
  }
}
