import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthServiceProvider} from "./auth-service";
import {AdminLocalStorageService} from "./admin-local-storage.service";

@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient, private authService: AuthServiceProvider,
                private localStorage: AdminLocalStorageService) {}

    saveCategory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            const authData = this.localStorage.getToken();

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': authData.jwtToken
                })
            };

            let body = JSON.stringify({
                '$key': data.name
            });

            this.httpClient.post(environment.apiUrl + '/category', body, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            const authData = this.localStorage.getToken();

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': authData.jwtToken
                })
            };

            this.httpClient.get(environment.apiUrl + '/category', httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCategory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.apiUrl + `/category/${key}`).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    removeCategory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(environment.apiUrl + `/category/${key}`).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

}
