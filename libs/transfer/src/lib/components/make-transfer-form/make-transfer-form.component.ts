import { NgIf } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ButtonModule } from '@backbase/ui-ang/button';
import { CurrencyInputModule } from '@backbase/ui-ang/currency-input';
import { InputValidationMessageModule } from '@backbase/ui-ang/input-validation-message';
import { TRANSLATIONS } from '../../constants/dynamic-translations';
import { Account, Transfer } from '../../model/Account';

@Component({
  selector: 'bb-make-transfer-form',
  templateUrl: 'make-transfer-form.component.html',
  standalone: true,
  imports: [
    NgIf,
    ButtonModule,
    ReactiveFormsModule,
    InputValidationMessageModule,
    CurrencyInputModule,
  ]
})
export class MakeTransferFormComponent implements OnInit {
  @Input() account: Account | undefined;
  @Input() showMaskIndicator = true;
  @Input() maxLimit = 0;

  @Output() submitTransfer = new EventEmitter<Transfer | undefined>();
  makeTransferForm!: UntypedFormGroup;

  private getControl(field: string): AbstractControl | undefined {
    return this.makeTransferForm.controls[field];
  }

  private validateAmount(
    value: number,
    description: string
  ): (control: AbstractControl) => unknown {
    return (control: AbstractControl) => {
      const amount = control.value.amount as number;

      if (amount > value) {
        return {
          max: description,
        };
      }

      return null;
    };
  }

  transfer(): void {
    if (this.makeTransferForm.valid) {
      this.submitTransfer.emit({
        fromAccount: this.makeTransferForm.value.fromAccount,
        toAccount: this.makeTransferForm.value.toAccount,
        amount: this.makeTransferForm.value.amount.amount,
      });
    } else {
      this.makeTransferForm.markAllAsTouched();
    }
  }

  getError(field: string, type: string): string {
    const control = this.getControl(field);

    return control && control.errors && control.errors[type];
  }

  isInvalidControl(field: string): boolean {
    const control = this.getControl(field);

    return !!control && control.touched && control.invalid;
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.makeTransferForm = this.fb.group({
      fromAccount: [
        {
          value: `${this.showMaskIndicator ? '*****' : this.account?.name}: €${
            this.account?.amount
          }`,
          disabled: true,
        },
      ],
      toAccount: ['', Validators.required],
      amount: [
        '',
        [
          Validators.required,
          this.validateAmount(this.account?.amount || 0, TRANSLATIONS.maxError),
          ...(this.maxLimit > 0
            ? [
                this.validateAmount(
                  this.maxLimit,
                  TRANSLATIONS.limitError(this.maxLimit)
                ),
              ]
            : []),
        ],
      ],
    });
  }
}
