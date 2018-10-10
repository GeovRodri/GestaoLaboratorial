import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthServiceProvider} from "../services/auth-service";

@Injectable()
export class UserCanAdminGuard implements CanActivate {

    constructor(private authService: AuthServiceProvider) {}

    canActivate(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.authService.isAdmin().then((isAdmin) => {
                resolve(!!isAdmin);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
