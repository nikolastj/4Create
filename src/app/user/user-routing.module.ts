import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNames } from '../app.routes.enum';
import { LayoutComponent } from '../layout/layout/layout.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserCrateComponent } from './user-crate/user-crate.component';

const routes: Routes = [
  {
    path: RouteNames.Users,
    component: LayoutComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: UserOverviewComponent },
          {
            path: RouteNames.Create,
            component: UserCrateComponent,
          },
        ],
        data: {
          reuseComponent: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserRoutingModule {}
