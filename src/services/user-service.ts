import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from.js';
import { CognitoUserSession, CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { environment } from '../environments/environment';
import { CognitoUtils } from '../utils/cognito-utils';
import { AdminLocalStorageService } from './admin-local-storage.service';
import {AuthServiceProvider} from "./auth-service";

@Injectable()
export class UsersService {

    session: CognitoUserSession;
    cognitoAdminService: AWS.CognitoIdentityServiceProvider;
    userPool: CognitoUserPool;

    constructor(private http: HttpClient, private router: Router, private adminLocalStorage: AdminLocalStorageService,
                private authService: AuthServiceProvider) {
        this.cognitoAdminService = new AWS.CognitoIdentityServiceProvider({
            accessKeyId: environment.awsConfig.accessKeyId,
            secretAccessKey: environment.awsConfig.secretAccessKey,
            region: environment.awsConfig.region
        });
        this.userPool = CognitoUtils.getUserPool();
    }

    public logout() {
        this.session = null;
        this.cognitoAdminService = null;
        this.userPool = null;
        this.adminLocalStorage.deleteToken();
        this.authService.informLoggedUserToObservers(null);
    }

    public login(login: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser(this.getUserData(login));
            cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
            const authenticationDetails = new AuthenticationDetails(CognitoUtils.getAuthDetails(login, password));

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    this.session = result;
                    const token = result.getIdToken();
                    const accessToken = result.getAccessToken();
                    this.adminLocalStorage.setToken(token);
                    this.adminLocalStorage.setAccessToken(accessToken);
                    this.authService.informLoggedUserToObservers(result);
                    resolve(result);
                },
                onFailure: err => {
                    reject(err);
                },
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    cognitoUser.completeNewPasswordChallenge(password, requiredAttributes, {
                        onSuccess: (result) => {
                            this.authService.informLoggedUserToObservers(result);
                            resolve(result);
                        },
                        onFailure: (err) => {
                            reject('Error in create new password');
                        }
                    });
                }
            });
        });
    }

    private getUserData(email: string) {
        return {
            Username: email,
            Pool: this.userPool
        };
    }

    public addUser(newUser: any): Observable<Object> {
        return Observable.create(obs => {
            const attrs = CognitoUtils.createNewUserAttributes(newUser);
            const cognitoUser = new CognitoUser(this.getUserData(newUser.username));
            this.userPool.signUp(newUser.username, newUser.password, attrs, [], (error, data) => {
                if (error) {
                    console.error(error);
                    obs.next(false);
                    return;
                }
                this.cognitoAdminService.adminConfirmSignUp({
                    Username: newUser.username,
                    UserPoolId: this.userPool.getUserPoolId()
                }, (e, d) => this.defaultAdminCallback(e, d, obs));
            });
        });
    }

    private defaultAdminCallback(error, data, obs, ok: any = true, no: any = false) {
        if (error) {
            console.error(error);
            obs.next(no);
            return;
        }
        obs.next(ok);
    }
}
