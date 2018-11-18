import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthServiceProvider} from "./auth-service";

@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient, private authService: AuthServiceProvider) {}

    saveCategory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();

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
            const httpOptions = this.authService.getOptions();

            this.httpClient.get(environment.apiUrl + '/category', httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCategory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();

            this.httpClient.get(environment.apiUrl + `/category/${key}`, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    removeCategory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();

            this.httpClient.delete(environment.apiUrl + `/category/${key}`, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }
}
