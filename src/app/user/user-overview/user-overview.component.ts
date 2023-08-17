import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from '../state/users.service';
import { UsersQuery } from '../state/users.query';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ModalComponent,
  ModalData,
} from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'four-create-user-overview',
  template: `<four-create-user-table
      [users]="users$ | async"
      [canAddUser]="canAddUser"
      [loading]="loading$ | async"
      (addUserEvent)="openUserModal()"
      (toggleUserActiveStatus)="toggleUserActiveStatus($event)"
      (deleteUser)="deleteUser($event)"
    ></four-create-user-table>
    <ng-template #crateUserTemplate>
      <four-create-user-crate
        (submitUserForm)="addUser($event)"
      ></four-create-user-crate>
    </ng-template> `,
})
export class UserOverviewComponent {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  canAddUser = false;
  modalRef: MatDialogRef<ModalComponent, any> | undefined;
  @ViewChild('crateUserTemplate', { read: TemplateRef }) crateUserTemplate:
    | TemplateRef<any>
    | undefined;

  constructor(
    private userService: UsersService,
    private userQuery: UsersQuery,
    private modalService: MatDialog,
    private usersQuery: UsersQuery
  ) {
    this.userService.get().subscribe();
    this.users$ = this.userQuery.selectAll().pipe(
      tap((users) => {
        if (!users || (users.length < 5 && this.areAllUsersActive(users)))
          this.canAddUser = true;
        else this.canAddUser = false;
      })
    );

    this.loading$ = this.usersQuery.selectLoading();
  }

  openUserModal() {
    const modalData: ModalData = {
      header: 'Create user',
      htmlContent: this.crateUserTemplate,
    };
    this.modalRef = this.modalService.open(ModalComponent, { data: modalData });
  }

  areAllUsersActive(users: User[]): boolean {
    if (!users) return true;
    return users.filter((user) => !user.active).length === 0;
  }

  toggleUserActiveStatus(user: User) {
    this.userService.update(user.id, user);
  }

  deleteUser(user: User) {
    this.userService.remove(user.id);
  }
  addUser(user: User) {
    this.userService.add(user).subscribe({
      next: () => {
        this.modalRef?.close();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
