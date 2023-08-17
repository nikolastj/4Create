import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from './user-overview/user-table/user-table.component';
import { UserCrateComponent } from './user-crate/user-crate.component';

@NgModule({
  declarations: [UserOverviewComponent, UserTableComponent, UserCrateComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
