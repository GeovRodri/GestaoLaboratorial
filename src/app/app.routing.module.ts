import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from '../pages/dashboard-page/dashboard-page.component';
import {PageNotFound} from "../pages/404-page/app-page-not-found.component";

export const ROUTES: Routes = [
    { path: '', component: DashboardPageComponent },
    { path: '**', component: PageNotFound }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
