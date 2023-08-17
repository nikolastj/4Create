import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from '../utils';
import { UserApiService } from 'src/app/api/user.api.service';
import { UsernameValidator } from './username-valaidator';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  active: boolean;
  username: string;
}

export class User implements IUser {
  constructor(
    public id: string, // Use public instead of private
    public firstName: string,
    public lastName: string,
    public gender: 'male' | 'female' | 'other',
    public email: string,
    public active: boolean = false,
    public username: string
  ) {}
}

export class UserFormGroup extends FormGroup {
  constructor(private userApiService: UserApiService, user: Partial<User> = {}) {
    super({
      id: new FormControl(user.id),
      firstName: new FormControl(user.firstName),
      lastName: new FormControl(user.lastName),
      gender: new FormControl(user.gender),
      email: new FormControl(user.email, [
        Validators.required,
        Validators.email,
      ]),
      active: new FormControl(
        isNullOrUndefined(user.active) ? false : user.active
      ),
      username: new FormControl(
        user.username,
        [Validators.required, Validators.minLength(3)],
        [UsernameValidator.createValidator(userApiService)]
      ),
    });
  }

  get id(): FormControl<string> {
    return this.get('id') as FormControl<string>;
  }

  get firstName(): FormControl<string> {
    return this.get('firstName') as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.get('lastName') as FormControl<string>;
  }

  get gender(): FormControl<'male' | 'female' | 'other'> {
    return this.get('gender') as FormControl<'male' | 'female' | 'other'>;
  }

  get email(): FormControl<string> {
    return this.get('email') as FormControl<string>;
  }

  get active(): FormControl<boolean> {
    return this.get('active') as FormControl<boolean>;
  }

  get username(): FormControl<string> {
    return this.get('username') as FormControl<string>;
  }
}
