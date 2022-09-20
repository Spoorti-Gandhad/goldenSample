import { Component } from '@angular/core';
import { LayoutService } from '@backbase/ui-ang/layout';
import { CommonModule } from '@angular/common';
import { LogoModule } from '@backbase/ui-ang/logo';
import { IconModule } from '@backbase/ui-ang/icon';
import { RouterModule } from '@angular/router';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { OAuthService } from 'angular-oauth2-oidc';
import { triplets } from './services/entitlementsTriplets';
import { environment } from '../environments/environment';
import { LocaleSelectorComponent } from './locale-selector/locale-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LogoModule,
    IconModule,
    EntitlementsModule,
    LocaleSelectorComponent,
  ],
})
export class AppComponent {
  triplets = triplets;
  isAuthenticated = false;
  locales = environment.locales;

  constructor(
    private oAuthService: OAuthService,
    public layoutService: LayoutService
  ) {
    this.isAuthenticated = oAuthService.hasValidAccessToken();
  }

  logout(): void {
    this.oAuthService.logOut(true);
  }

  focusMainContainer(event: MouseEvent) {
    const element = event.view?.window.document.querySelector(
      '[role="main"]'
    ) as HTMLElement | undefined;
    element?.focus();
  }
}
