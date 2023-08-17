import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'four-create-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() canAddUser: boolean;
  @Input() loading: boolean;
  @Output() addUserEvent = new EventEmitter<User>();
  @Output() toggleUserActiveStatus = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'active',
    'actions',
  ];

  addUserClicked() {
    this.addUserEvent.emit();
  }

  toggleActiveStatusClicked(user: User) {
    this.toggleUserActiveStatus.emit(user);
  }

  deleteUserClicked(user: User) {
    this.deleteUser.emit(user);
  }
}
