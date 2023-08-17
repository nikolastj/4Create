import { Component, EventEmitter, Output } from '@angular/core';
import { UserApiService } from 'src/app/api/user.api.service';
import { User, UserFormGroup } from 'src/app/shared/models/user.model';
@Component({
  selector: 'four-create-user-crate',
  templateUrl: './user-crate.component.html',
  styleUrls: ['./user-crate.component.scss'],
})
export class UserCrateComponent {
  userForm: UserFormGroup = new UserFormGroup(this.service);
  @Output() submitUserForm = new EventEmitter<User>();

  constructor(private service: UserApiService) {}

  submitUser() {
    this.submitUserForm.emit(this.userForm.getRawValue());
  }
}
