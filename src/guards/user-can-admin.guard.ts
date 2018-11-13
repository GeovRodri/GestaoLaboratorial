import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthServiceProvider} from "../services/auth-service";
import {ToastrServiceProvider} from "../services/toastr-service";

@Injectable()
export class UserCanAdminGuard implements CanActivate {

    constructor(private authService: AuthServiceProvider, private router: Router, private toastr: ToastrServiceProvider) {}

    canActivate(): Promise<boolean>{
        return new Promise(resolve => {
            if(this.authService.isAuthenticated()){
                resolve(true);
            } else {
                this.toastr.showErrorToast("Refaça o login", "Não autorizado");
                this.router.navigate(['/']);
                resolve(false);
            }
        });
    }
}
