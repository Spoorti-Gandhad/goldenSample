import { DatePipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { TransactionItem } from '@backbase/data-ang/transactions';
import { AmountModule } from '@backbase/ui-ang/amount';
import { ViewExtensionDirective } from '@backbase/ui-ang/view-extensions';
import {
  TRANSACTION_EXTENSIONS_CONFIG,
  TransactionsJourneyExtensionsConfig,
  TransactionAdditionalDetailsComponent,
  TransactionAdditionalDetailsContext,
} from '../../extensions';

@Directive({
  selector: '[bbTransactionsItemAdditions]',
  standalone: true,
})
export class TransactionItemAdditionalDetailsDirective
  extends ViewExtensionDirective<TransactionAdditionalDetailsContext> { }

@Component({
  selector: 'bb-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgClass,
    AmountModule,
    TransactionItemAdditionalDetailsDirective,
  ]
})
export class TransactionItemComponent implements OnChanges {
  @Input()
  public transaction!: TransactionItem;

  public amount = 0;
  public isAmountPositive = true;
  public additionsDetails?: Type<TransactionAdditionalDetailsComponent>;
  public additionsDetailsContext?: TransactionAdditionalDetailsContext;

  constructor(
    @Inject(TRANSACTION_EXTENSIONS_CONFIG)
    extensionsConfig: TransactionsJourneyExtensionsConfig
  ) {
    this.additionsDetails = extensionsConfig.transactionItemAdditionalDetails;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction']) {
      this.amount = Number(
        this.transaction.transactionAmountCurrency.amount ?? 0
      );

      if (this.transaction.creditDebitIndicator === 'DBIT') {
        this.amount *= -1;
      }

      this.isAmountPositive = this.amount > 0;
      this.additionsDetailsContext = {
        merchant: this.transaction.merchant,
        additions: this.transaction.additions,
        counterPartyAccountNumber: this.transaction.counterPartyAccountNumber,
      };
    }
  }
}
