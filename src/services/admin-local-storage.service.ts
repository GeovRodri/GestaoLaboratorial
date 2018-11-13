import { Injectable } from '@angular/core';


@Injectable()
export class AdminLocalStorageService {

    constructor() {}

    public getToken(): any{
        return JSON.parse(localStorage.getItem('awsToken'));
    }

    public deleteToken(): any{
        return localStorage.removeItem('awsToken');
    }

    public setToken(token): any {
        return localStorage.setItem('awsToken', token);
    }

    public setAccessToken(accessToken): any {
        return localStorage.setItem('awsAccessToken', accessToken);
    }
}
