import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNames } from './app.routes.enum';
import { UserRoutingModule } from './user/user-routing.module';
import { PublicRoutingModule } from './public/public-routing.module';

const routes: Routes = [
  { path: '', redirectTo: RouteNames.Users, pathMatch: 'full' },
  { path: '**', redirectTo: `${RouteNames.Public}/${RouteNames.PageNotFound}` },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UserRoutingModule,
    PublicRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
