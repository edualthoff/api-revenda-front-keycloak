import { MatNativeDateModule } from '@angular/material/core';
import { ErrorModule } from './core/error/error.module';
import { AppInjector } from './core/services/app-injector.service';
import { HttpConfigInterceptor } from './core/interceptors/http-config.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import localePT from '@angular/common/locales/pt';
import localeExtraPT from '@angular/common/locales/extra/pt';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializerKeycloak } from './core/util/app-init';

registerLocaleData(localePT, 'pt', localeExtraPT);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    ErrorModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializerKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    [{ provide: LOCALE_ID, useValue: 'pt' }],
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthenticTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
  constructor(injector: Injector) {
    // Store module's injector in the AppInjector class
    //console.log('Expected #1: storing app injector');
    AppInjector.setInjector(injector);
  }
}
