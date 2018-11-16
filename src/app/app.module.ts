import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {AppRoutingModule} from './app.routing.module';
import {LoggedInTemplateComponent} from '../components/logged-in-template/logged-in-template.component';
import {LoggedOutTemplateComponent} from "../components/logged-out-template/logged-out-template.component";
import {PageNotFound} from "../pages/404-page/app-page-not-found.component";
import {AuthServiceProvider} from "../services/auth-service";
import {ReserveRoomPageComponent} from "../pages/reserve-room-page/reserve-room-page.component";
import {UserCanAdminGuard} from "../guards/user-can-admin.guard";
import {LaboratoriesPageComponent} from "../pages/laboratories/laboratories-page.component";
import {LaboratoryPageComponent} from "../pages/laboratory/laboratory-page.component";
import {LaboratoryService} from "../services/laboratory-service";
import {ToastrServiceProvider} from "../services/toastr-service";
import {CategoryService} from "../services/category-service";
import {CategoriesPageComponent} from "../pages/categories/categories-page.component";
import {CategoryPageComponent} from "../pages/category/category-page.component";
import {HttpClientModule} from "@angular/common/http";
import {AdminLocalStorageService} from "../services/admin-local-storage.service";
import {UsersService} from "../services/user-service";


@NgModule({
    declarations: [
        AppComponent,
        LoggedInTemplateComponent,
        LoggedOutTemplateComponent,
        PageNotFound,
        ReserveRoomPageComponent,
        LaboratoriesPageComponent,
        LaboratoryPageComponent,
        CategoriesPageComponent,
        CategoryPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
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
        ToastrServiceProvider,
        CategoryService,
        AdminLocalStorageService,
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
