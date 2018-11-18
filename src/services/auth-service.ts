import {Injectable} from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {AdminLocalStorageService} from "./admin-local-storage.service";
import {Observable, Subscription} from "rxjs";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthServiceProvider {

    authstate: any;

    userObservable: Observable<any>;
    userObservers: Array<Subscription> = [];

    constructor(private localStorage: AdminLocalStorageService) {
        const accessKey = localStorage.getToken();
        if (accessKey) {
            this.informLoggedUserToObservers(accessKey);
        }

        this.userObservable = Observable.create((observer) => {
            this.userObservers.push(observer);
            if (this.authstate) {
                const user = this.authstate ? this.authstate : null;
                observer.next(user);
            }
        });
    }

    watchUser(): Observable<any> {
        return this.userObservable;
    }

    public informLoggedUserToObservers(user): void {
        this.authstate = user;
        for (const observer of this.userObservers) {
            (<any>observer).next(user);
        }
    }


    isAuthenticated(){
        let token = this.localStorage.getToken();
        return token != null;
    }

    public isAdmin() {
        return new Promise((resolve, reject) => {
            resolve(true);
            /*this.afDb.object('admins/' + this.authstate.uid).valueChanges().take(1).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });*/
        });
    }

    public getOptions() {
        const authData = this.localStorage.getToken();

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': authData.jwtToken
            })
        };
    }
}
