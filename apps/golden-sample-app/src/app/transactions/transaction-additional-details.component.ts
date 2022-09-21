import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  TransactionAdditionalDetailsComponent,
  TransactionAdditionalDetailsContext,
} from '@libs/transactions';

@Component({
  selector: 'app-custom-txn-info',
  styleUrls: ['./transaction-additional-details.component.scss'],
  templateUrl: './transaction-additional-details.component.html',
  standalone: true,
  imports: [
    NgIf,
  ]
})
export class TransactionItemAdditionalDetailsComponent
  implements TransactionAdditionalDetailsComponent
{
  @Input()
  context: TransactionAdditionalDetailsContext | undefined;
}
