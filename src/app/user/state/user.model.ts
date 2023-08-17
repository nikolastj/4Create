import { User } from 'src/app/shared/models/user.model';

export function createUser(params: Partial<User>) {
  console.log(params);
  return {} as User;
}
