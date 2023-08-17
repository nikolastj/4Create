import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserApiService } from '../../api/user.api.service';

export class UsernameValidator {
  static createValidator(userService: UserApiService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      control.markAsTouched();
      return timer(500).pipe(
        switchMap(() =>
          userService
            .isUsernameUnique(control.value)
            .pipe(
              map<boolean, ValidationErrors>((result: boolean) =>
                result ? null : { usernameAlreadyExists: true }
              )
            )
        )
      );
    };
  }
}
