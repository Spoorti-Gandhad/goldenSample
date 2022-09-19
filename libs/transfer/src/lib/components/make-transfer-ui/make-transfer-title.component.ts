import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bb-make-transfer-title',
  template: ` <h1 *ngIf="title !== ''">{{ title }}</h1> `,
  standalone: true,
  imports: [CommonModule],
})
export class MakeTransferTitleComponent {
  @Input() title = '';
}
