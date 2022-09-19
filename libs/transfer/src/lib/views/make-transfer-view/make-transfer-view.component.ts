import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { map } from 'rxjs/operators';
import { MakeTransferJourneyConfiguration } from '../../services/make-transfer-journey-config.service';
import { Transfer } from '../../model/Account';
import { MakeTransferPermissionsService } from '../../services/make-transfer-permissions.service';
import {
  MakeTransferJourneyState,
  TransferLoadingStatus,
} from '../../state/make-transfer-journey-state.service';
import { MakeTransferTitleComponent } from '../../components/make-transfer-ui/make-transfer-title.component';
import { MakeTransferFormComponent } from '../../components/make-transfer-form/make-transfer-form.component';

@Component({
  templateUrl: 'make-transfer-view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MakeTransferTitleComponent,
    MakeTransferFormComponent,
    LoadingIndicatorModule,
  ]
})
export class MakeTransferViewComponent {
  title = this.route.snapshot.data['title'];
  vm$ = this.transferStore.vm$;
  limit$ = this.permissions.unlimitedAmountPerTransaction$.pipe(
    map((resolve) => (!resolve ? this.config.maxTransactionAmount : 0))
  );

  submitTransfer(transfer: Transfer | undefined): void {
    if (transfer !== undefined) {
      this.transferStore.next(transfer);
      this.router.navigate(['../make-transfer-summary'], {
        relativeTo: this.route,
        state: {
          transfer,
        },
      });
    }
  }

  isLoading(status: TransferLoadingStatus) {
    return status === TransferLoadingStatus.LOADING;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transferStore: MakeTransferJourneyState,
    private readonly permissions: MakeTransferPermissionsService,
    public readonly config: MakeTransferJourneyConfiguration
  ) {
    transferStore.loadAccounts();
  }
}
