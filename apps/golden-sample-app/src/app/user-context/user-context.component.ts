import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectContextWidgetModule } from '@backbase/select-context-widget-ang';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserContextGuard } from './user-context.guard';

@Component({
  selector: 'app-user-context',
  templateUrl: './user-context.component.html',
  standalone: true,
  imports: [
    SelectContextWidgetModule,
  ],
})
export class UserContextComponent {
  private readonly redirectUrl: string;

  constructor(
    private userContextGuard: UserContextGuard,
    private authService: OAuthService,
    private router: Router
  ) {
    this.redirectUrl = this.userContextGuard.getTargetUrl() ?? '/';
  }

  redirect() {
    this.router.navigateByUrl(this.redirectUrl);
  }

  logout() {
    this.authService.revokeTokenAndLogout();
  }
}
