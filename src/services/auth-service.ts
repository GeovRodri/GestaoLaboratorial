import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import * as firebase from "firebase";

@Injectable()
export class AuthServiceProvider {

    authstate: any;

    userObservable: Observable<firebase.User>;
    userObservers: Array<Subscription> = [];

    constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {

        afAuth.authState.subscribe(authState => {
            this.authstate = authState;
            this.informLoggedUserToObservers(authState);
        });

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

    public login(mail: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(mail, password).then((user) => {
                resolve();
            }).catch((error) => {
                reject(error)
            });
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signOut().then(() => {
                this.informLoggedUserToObservers(null);
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    private informLoggedUserToObservers(user: firebase.User): void {
        for (const observer of this.userObservers) {
            (<any>observer).next(user);
        }
    }

    public isAdmin() {
        return new Promise((resolve, reject) => {
            this.afDb.object('admins/' + this.authstate.uid).valueChanges().take(1).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    getUserJWTToken(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.authstate.getIdToken(true).then((idToken) => {
                resolve(idToken);
            });
        });
    }
}
