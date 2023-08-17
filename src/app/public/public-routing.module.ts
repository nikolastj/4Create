import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNames } from '../app.routes.enum';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicPageLayoutComponent } from './public-page-layout/public-page-layout.component';

const routes: Routes = [
  {
    path: RouteNames.Public,
    component: PublicPageLayoutComponent,
    children: [
      { path: RouteNames.Login, component: LoginComponent },
      { path: RouteNames.PageNotFound, component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PublicRoutingModule {}
