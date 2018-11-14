import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import Utils from "../utils/utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient) {}

    saveCategory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = JSON.stringify({
                '$key': data.name
            });

            this.httpClient.post(environment.apiUrl + '/category', body).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.apiUrl + '/category').take(1).subscribe((result) => {
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
