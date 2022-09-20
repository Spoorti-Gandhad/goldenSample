import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-user-accounts-view',
  templateUrl: './user-accounts-view.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
  ],
  providers: [
    UserAccountsService,
  ]
})
export class UserAccountsViewComponent {
  public arrangements$ = this.userAccountsService.arrangements$;

  constructor(private readonly userAccountsService: UserAccountsService) {}
}
