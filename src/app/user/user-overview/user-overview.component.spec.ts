import {
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { UserOverviewComponent } from './user-overview.component';
import { UsersService } from '../state/users.service';
import { UsersQuery } from '../state/users.query';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user.module';

describe('UserOverviewComponent', () => {
  let component: UserOverviewComponent;
  let fixture: ComponentFixture<UserOverviewComponent>;
  let mockUserService: Partial<UsersService>;
  let mockUserQuery: Partial<UsersQuery>;
  let mockMatDialog: Partial<MatDialog>;

  beforeEach(() => {
    mockUserService = {
      get: jasmine.createSpy('get').and.returnValue(of([])),
      update: jasmine.createSpy('update'),
      remove: jasmine.createSpy('remove'),
      add: jasmine.createSpy('add').and.returnValue(of()),
    };

    mockUserQuery = {
      selectAll: jasmine.createSpy('selectAll').and.returnValue(of([])),
      selectLoading: jasmine
        .createSpy('selectLoading')
        .and.returnValue(of(false)),
    };

    mockMatDialog = {
      open: jasmine.createSpy('open').and.returnValue({}),
    };

    TestBed.configureTestingModule({
      declarations: [UserOverviewComponent],
      imports: [UserModule, SharedModule],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: UsersQuery, useValue: mockUserQuery },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    });

    fixture = TestBed.createComponent(UserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', fakeAsync(() => {
    const dummyTemplateRef: any = {};
    component.crateUserTemplate = dummyTemplateRef;

    component.openUserModal();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.anything(), {
      data: jasmine.objectContaining({
        header: 'Create user',
        htmlContent: dummyTemplateRef,
      }),
    });
  }));
});
