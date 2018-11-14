import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {AdminLocalStorageService} from "./admin-local-storage.service";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class AuthServiceProvider {

    authstate: any;

    userObservable: Observable<any>;
    userObservers: Array<Subscription> = [];

    constructor(private localStorage: AdminLocalStorageService) {
        this.userObservable = Observable.create((observer) => {
            this.userObservers.push(observer);
            if (this.authstate) {
                const user = (this.authstate != null) ? this.authstate.email : null;
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
}
