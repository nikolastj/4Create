import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { UsersStore } from './users.store';
import { User } from 'src/app/shared/models/user.model';
import { UserApiService } from 'src/app/api/user.api.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private usersStore: UsersStore,
    private userApiService: UserApiService
  ) {}

  get() {
    return this.userApiService.getUsers().pipe(
      tap((entities) => {
        this.usersStore.set(entities);
      })
    );
  }

  add(user: User): Observable<User> {
    return this.userApiService.createUser(user).pipe(
      tap((res) => this.usersStore.add(res)),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  update(id, user: Partial<User>) {
    this.userApiService.toggleActiveStatus(id, !user.active).subscribe({
      next: (res) => {
        this.usersStore.update(id, res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  remove(id: string) {
    this.userApiService.deleteUser(id).subscribe({
      next: () => {
        this.usersStore.remove(id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
