import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { PublicPageLayoutComponent } from './public-page-layout/public-page-layout.component';


@NgModule({
	declarations: [
		PageNotFoundComponent,
		LoginComponent,
		PublicPageLayoutComponent
	],
	imports: [
		PublicRoutingModule
	]
})
export class PublicModule { }
