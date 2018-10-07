import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {AuthGuard} from '../guards/auth.guard';
import {NotLoggedGuard} from '../guards/not-logged.guard';
import {DashboardPageComponent} from '../pages/dashboard-page/dashboard-page.component';
import {PageNotFound} from "../pages/404-page/app-page-not-found.component";

export const ROUTES: Routes = [
    { path: '', component: DashboardPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent, canActivate: [NotLoggedGuard] },
    { path: '**', component: PageNotFound }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
