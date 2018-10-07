import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

    authstate: any;

    userObservable: Observable<string>;
    userObservers: Array<Subscription> = [];

    constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {

        afAuth.authState.subscribe(authState => {
            this.authstate = authState;
            const user = (this.authstate != null) ? this.authstate.email : null;
            this.informLoggedUserToObservers(user);
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

    private informLoggedUserToObservers(userId: string): void {
        for (const observer of this.userObservers) {
            (<any>observer).next(userId);
        }
    }

    /*loginWithPassword(phoneNumber: string, password: string): Promise<any> {
      return new Promise((resolve, reject) => {
        const email = phoneNumber + '@login.stayapp.com.br';
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
          this.subscribeUserFb(result);
          const loggedUser = Utils.adjustPhoneNumber(phoneNumber);
          if (loggedUser != null) {
            this.userService.refreshUserLoginToken(loggedUser);
          }
          resolve(result);

        }).catch(error => {
          reject(error);
        });
      });
    }*/
}
