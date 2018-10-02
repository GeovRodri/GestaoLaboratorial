import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  //{ path: '', component: ManualPaymentPage, canActivate: [AuthGuard, UserAdminGuard], data: {title: 'Pagamento Manual'}},
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
