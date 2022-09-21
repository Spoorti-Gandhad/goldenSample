import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: 'transfer-journey.component.html',
  imports: [
    RouterModule,
  ],
})
export class TransferJourneyComponent {
  protected title = this.route.snapshot.firstChild?.data['title'];

  constructor(private route: ActivatedRoute) { }
}
