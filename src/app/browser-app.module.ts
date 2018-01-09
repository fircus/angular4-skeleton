import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {BrowserTransferStateModule} from './shared/modules/transfer-state/browser-transfer-state.module';
import {TransferState} from './shared/modules/transfer-state/transfer-state';

export function getRequest(transferState) {
  return transferState.get('req');
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppModule
  ],
  providers: [
    {
      provide: 'isBrowser',
      useValue: true
    },
    {
      provide: 'isNode',
      useValue: false
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
export class BrowserAppModule {
}
