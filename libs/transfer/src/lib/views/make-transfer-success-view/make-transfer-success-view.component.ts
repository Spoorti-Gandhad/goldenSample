import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from '@backbase/ui-ang/button';
import { MakeTransferTitleComponent } from '../../components/make-transfer-ui/make-transfer-title.component';
import { MakeTransferJourneyState } from '../../state/make-transfer-journey-state.service';

@Component({
  templateUrl: 'make-transfer-success-view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MakeTransferTitleComponent,
  ]
})
export class MakeTransferSuccessViewComponent {
  transfer$ = this.transferStore.transfer$;
  title = this.route.snapshot.data['title'];

  close(): void {
    this.router.navigate(['../make-transfer'], { relativeTo: this.route });
  }

  constructor(
    private readonly transferStore: MakeTransferJourneyState,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }
}
