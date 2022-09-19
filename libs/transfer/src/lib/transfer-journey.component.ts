import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MakeTransferJourneyState } from './state/make-transfer-journey-state.service';

@Component({
  standalone: true,
  templateUrl: 'transfer-journey.component.html',
  imports: [
    RouterModule,
  ],
  providers: [MakeTransferJourneyState],
})
export class TransferJourneyComponent {}
