import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFound} from "../pages/404-page/app-page-not-found.component";
import {ReserveRoomPageComponent} from "../pages/reserve-room-page/reserve-room-page.component";
import {LaboratoriesPageComponent} from "../pages/laboratories/laboratories-page.component";
import {UserCanAdminGuard} from "../guards/user-can-admin.guard";
import {LaboratoryPageComponent} from "../pages/laboratory/laboratory-page.component";

export const ROUTES: Routes = [
    { path: '', component: ReserveRoomPageComponent },
    { path: 'laboratories', component: LaboratoriesPageComponent, canActivate: [UserCanAdminGuard] },
    { path: 'laboratory', component: LaboratoryPageComponent, canActivate: [UserCanAdminGuard] },
    { path: 'laboratory/:id', component: LaboratoryPageComponent, canActivate: [UserCanAdminGuard] },
    { path: '**', component: PageNotFound }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
