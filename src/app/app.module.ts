import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import {environment} from '../environments/environment';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {AppRoutingModule} from './app.routing.module';
import {LoggedInTemplateComponent} from '../components/logged-in-template/logged-in-template.component';
import {LoggedOutTemplateComponent} from "../components/logged-out-template/logged-out-template.component";
import {PageNotFound} from "../pages/404-page/app-page-not-found.component";
import {AuthServiceProvider} from "../services/auth-service";
import { AngularFireAuthModule } from 'angularfire2/auth';
import {ReserveRoomPageComponent} from "../pages/reserve-room-page/reserve-room-page.component";
import {UserCanAdminGuard} from "../guards/user-can-admin.guard";
import {LaboratoriesPageComponent} from "../pages/laboratories/laboratories-page.component";
import {LaboratoryPageComponent} from "../pages/laboratory/laboratory-page.component";
import {LaboratoryService} from "../services/laboratory-service";
import {ToastrServiceProvider} from "../services/toastr-service";


@NgModule({
    declarations: [
        AppComponent,
        LoggedInTemplateComponent,
        LoggedOutTemplateComponent,
        PageNotFound,
        ReserveRoomPageComponent,
        LaboratoriesPageComponent,
        LaboratoryPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary button-confirm',
            cancelButtonClass: 'btn btn-danger button-confirm'
        })
    ],
    providers: [
        UserCanAdminGuard,
        AuthServiceProvider,
        LaboratoryService,
        ToastrServiceProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
