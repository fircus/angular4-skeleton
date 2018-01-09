import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/modules/shared.module';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {HomeComponent} from './shared/components/home/home.component';
import {CookieService} from './shared/services/cookie.service';

export function exportTranslateStaticLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'lazy',
        loadChildren: './+lazy/lazy.module#LazyModule'
      }
    ]
  },
  {
    path: '**', redirectTo: '/'
  }
];


@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  exports: [AppComponent],
  providers: [
    CookieService
  ]
})
export class AppModule {
}
