import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from '@backbase/ui-ang/button';
import { Transfer } from '../../model/Account';

@Component({
  selector: 'bb-make-transfer-summary',
  templateUrl: 'make-transfer-summary.component.html',
  standalone: true,
  imports: [
    ButtonModule,
  ]
})
export class MakeTransferSummaryComponent {
  @Input() transfer: Transfer | undefined;
  @Output() submitTransfer = new EventEmitter<void>();
  @Output() closeTransfer = new EventEmitter<void>();

  submit(): void {
    this.submitTransfer.emit();
  }

  close(): void {
    this.closeTransfer.emit();
  }
}
