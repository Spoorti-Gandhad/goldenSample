import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, provideRoutes, RouterModule } from '@angular/router';
import { ARRANGEMENT_MANAGER_BASE_PATH } from '@backbase/arrangement-manager-http-ang';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/data-ang/accesscontrol';
import { TRANSACTIONS_BASE_PATH } from '@backbase/data-ang/transactions';
import { ENTITLEMENTS_CONFIG } from '@backbase/foundation-ang/entitlements';
import { LayoutModule } from '@backbase/ui-ang/layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthConfig, OAuthStorage, OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app/app.component';
import { routes } from './app/routing';

import { authConfig, environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      OAuthModule.forRoot({
        resourceServer: {
          allowedUrls: [environment.apiRoot],
          sendAccessToken: true,
        },
      }),
      LayoutModule,
    ),
    ...provideRouter(routes),
    ...(environment.mockProviders || []),
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthStorage, useFactory: () => localStorage },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [OAuthService],
      useFactory: (oAuthService: OAuthService) => () => oAuthService.loadDiscoveryDocumentAndTryLogin(),
    },
    {
      provide: TRANSACTIONS_BASE_PATH,
      useValue: environment.apiRoot + '/transaction-manager',
    },
    {
      provide: ARRANGEMENT_MANAGER_BASE_PATH,
      useValue: environment.apiRoot + '/arrangement-manager',
    },
    {
      provide: ACCESS_CONTROL_BASE_PATH,
      useValue: environment.apiRoot + '/access-control',
    },
    {
      provide: ENTITLEMENTS_CONFIG,
      useValue: {
        accessControlBasePath: `${environment.apiRoot}/access-control`,
      },
    },
  ],
})
  .catch((err) => console.error(err));
