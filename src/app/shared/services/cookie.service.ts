import {Inject, Injectable, Optional} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';

@Injectable()
export class CookieService {

  constructor(@Inject('isBrowser') public isBrowser: boolean, @Optional() @Inject(REQUEST) private req: any) {
  }

  public getCookie(name) {
    if (this.isBrowser) {
      let matches = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return matches ? matches[2] : null;
    } else {
      return this.req.cookies[name];
    }
  }

  public setCookie(name: string, value: string, day?) {
    let d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * (day || 7));
    if (this.isBrowser) {
      document.cookie = name + '=' + value + ';path=/;expires=' + d['toGMTString']();
    } else {
      this.req.cookie = name + '=' + value + ';path=/;expires=' + d['toGMTString']();
    }
  }

  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

}
