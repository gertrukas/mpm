import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-MX';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],

  providers: [{provide: LOCALE_ID, useValue: 'es-Mx' } ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
