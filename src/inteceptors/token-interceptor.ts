import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AdminLocalStorageService } from '../services/admin-local-storage.service';
import {AuthServiceProvider} from "../services/auth-service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthServiceProvider , private localStorage: AdminLocalStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authData = this.localStorage.getToken();
        let authReq = request;

        if (!!authData) {
            authReq = request.clone({
                setHeaders: {
                    'Content-Type':  'application/json',
                    'Authorization': authData.jwtToken
                }
            });
        }
        return next.handle(authReq);
    }
}
