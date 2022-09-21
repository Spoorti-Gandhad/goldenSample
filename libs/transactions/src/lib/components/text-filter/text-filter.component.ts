import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from '@backbase/ui-ang/input-text';

@Component({
  selector: 'bb-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
  ],
})
export class TextFilterComponent {
  @Output() textChange: EventEmitter<string> = new EventEmitter();
  text = '';
}
