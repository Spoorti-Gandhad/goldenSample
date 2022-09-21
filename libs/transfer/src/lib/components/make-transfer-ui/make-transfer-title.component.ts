import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bb-make-transfer-title',
  template: ` <h1 *ngIf="title !== ''">{{ title }}</h1> `,
  standalone: true,
  imports: [NgIf],
})
export class MakeTransferTitleComponent {
  @Input() title = '';
}
