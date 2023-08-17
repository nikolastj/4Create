import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCrateComponent } from './user-crate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from 'src/app/api/user.api.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/shared/models/user.model';

describe('UserCrateComponent', () => {
  let component: UserCrateComponent;
  let fixture: ComponentFixture<UserCrateComponent>;
  let userApiServiceStub: Partial<UserApiService>;

  beforeEach(() => {
    userApiServiceStub = {
      createUser: () => of({} as User),
    };

    TestBed.configureTestingModule({
      declarations: [UserCrateComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: UserApiService, useValue: userApiServiceStub }],
    });

    fixture = TestBed.createComponent(UserCrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
