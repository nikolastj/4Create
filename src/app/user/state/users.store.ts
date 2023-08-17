import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from 'src/app/shared/models/user.model';

export interface UsersState extends EntityState<User> {
  users: User[];
}

export function createInitialState(): UsersState {
  return {
    users: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super(createInitialState());
  }
}
