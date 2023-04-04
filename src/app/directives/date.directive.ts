import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Directive({
  selector: '[validateDateOfBirth][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateValidatorDirective,
      multi: true,
    },
  ],
})
export class DateValidatorDirective implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = this.dateValidator();
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  private dateValidator(): ValidatorFn {
    return (c: AbstractControl) => {
      if (c.value && new Date(c.value) > new Date()) {
        return {
          dateofbirth: {
            valid: false,
          },
        };
      }
      return null;
    };
  }
}
