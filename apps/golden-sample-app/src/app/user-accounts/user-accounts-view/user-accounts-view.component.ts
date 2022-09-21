import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ProductItemBasicAccountModule } from '@backbase/ui-ang/product-item-basic-account';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-user-accounts-view',
  templateUrl: './user-accounts-view.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    ProductItemBasicAccountModule,
    LoadingIndicatorModule,
  ],
  providers: [
    UserAccountsService,
  ]
})
export class UserAccountsViewComponent {
  public arrangements$ = this.userAccountsService.arrangements$;

  constructor(private readonly userAccountsService: UserAccountsService) {}
}
