import {APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {BrowserModule} from '@angular/platform-browser';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {ServerTransferStateModule} from './shared/modules/transfer-state/server-transfer-state.module';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {TransferState} from './shared/modules/transfer-state/transfer-state';
import {TranslateUniversalLoader} from './shared/services/translate-universal-loader.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
  return () => {
    appRef.isStable
      .filter(stable => stable)
      .first()
      .subscribe(() => {
        transferState.inject();
      });
  };
}

export function translateFactory() {
  return new TranslateUniversalLoader('./dist/assets/i18n', '.json');
}

export function getRequest(transferState) {
  return transferState.get('req');
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory
      }
    }),
    ServerModule,
    ServerTransferStateModule,
    NoopAnimationsModule,
    AppModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    },
    {
      provide: 'isBrowser',
      useValue: false
    },
    {
      provide: 'isNode',
      useValue: true
    },
    {
      provide: 'req',
      useFactory: getRequest,
      deps: [
        TransferState
      ]
    }
  ]
})
export class ServerAppModule {

}
