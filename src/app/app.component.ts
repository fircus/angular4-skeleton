import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';

import {TranslateService} from '@ngx-translate/core';

import {TransferState} from './shared/modules/transfer-state/transfer-state';
import {CookieService} from './shared/services/cookie.service';
import {DEFAULT_LANGUAGE, LANGUAGE_VARIABLE, PROTOCOL} from './app.config';

@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styleUrls: [
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../assets/styles/custom.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private cache: TransferState, public translate: TranslateService, @Inject('isBrowser') public isBrowser: boolean,
              @Optional() @Inject(REQUEST) private req: any,
              public cookieService: CookieService) {

    this.setLang();
  }

  ngOnInit() {
    if (!this.isBrowser) {
      this.cache.set('req', {
        cookies: this.req.cookies,
        originUrl: PROTOCOL + this.req.headers.host
      });
    }
  }

  public setLang() {

    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);

    let lang = this.cookieService.getCookie(LANGUAGE_VARIABLE);

    if (lang) {
      this.translate.use(lang);
    } else {
      this.translate.use(DEFAULT_LANGUAGE);
      this.cookieService.setCookie(LANGUAGE_VARIABLE, DEFAULT_LANGUAGE);
    }
  }

}
