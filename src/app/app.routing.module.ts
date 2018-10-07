import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFound} from "../pages/404-page/app-page-not-found.component";
import {ReserveRoomPageComponent} from "../pages/reserve-room-page/reserve-room-page.component";

export const ROUTES: Routes = [
    { path: '', component: ReserveRoomPageComponent },
    { path: '**', component: PageNotFound }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
