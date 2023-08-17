import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseApiUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseApiUrl}/users`, user);
  }

  isUsernameUnique(username: string): Observable<boolean> {
    return this.http.get<User[]>(`${environment.baseApiUrl}/users`).pipe(
      map((result: User[]) => {
        if (!result?.length) return true;
        return !result
          .map((x) => x.username)
          .filter((item) => item === username)?.length;
      })
    );
  }

  toggleActiveStatus(id: string, active: boolean): Observable<User> {
    return this.http.patch<User>(`${environment.baseApiUrl}/users/${id}`, {
      id: id,
      active: active,
    });
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseApiUrl}/users/${id}`);
  }
}
