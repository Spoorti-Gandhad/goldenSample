import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  TransactionsCommunicationService,
  TRANSACTIONS_JOURNEY_COMMUNICATION_SERIVCE,
} from '../../communication';
import { TextFilterComponent } from '../../components/text-filter/text-filter.component';
import { TransactionItemComponent } from '../../components/transaction-item/transaction-item.component';
import { FilterTransactionsPipe } from '../../pipes/filter-transactions.pipe';
import { TransactionsHttpService } from '../../services/transactions.http.service';

@Component({
  templateUrl: './transactions-view.component.html',
  selector: 'bb-transactions-view',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    RouterModule,
    LoadingIndicatorModule,
    TransactionItemComponent,
    TextFilterComponent,
    FilterTransactionsPipe,
  ]
})
export class TransactionsViewComponent {
  public title = this.route.snapshot.data['title'];
  public filter = '';

  public transactions$ = combineLatest([
    this.transactionsService.transactions$,
    this.externalCommunicationService?.latestTransaction$ || of(undefined),
  ]).pipe(
    map(([transactions, latestTransaction]) =>
      latestTransaction
        ? [latestTransaction, ...(transactions || [])]
        : transactions
    )
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly transactionsService: TransactionsHttpService,
    @Optional()
    @Inject(TRANSACTIONS_JOURNEY_COMMUNICATION_SERIVCE)
    private externalCommunicationService: TransactionsCommunicationService
  ) {}
}
