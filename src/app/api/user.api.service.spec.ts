import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserApiService } from './user.api.service';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

describe('UserService', () => {
  let service: UserApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users via GET request', () => {
    const dummyUsers = dummyData;

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/users`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});

export const dummyData: User[] = [
  {
    id: 'ae8cfe5b-8c27-4e15-b04e-af8a90e58b1e',
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    active: true,
    gender: 'male',
  },
  {
    id: 'c4f201d0-e4b6-4da3-9b79-97166e792e0d',
    username: 'jane_smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    active: true,
    gender: 'female',
  },
];
