import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthServiceProvider} from "./auth-service";
import {environment} from "../environments/environment";

@Injectable()
export class LaboratoryService {

    constructor(private httpClient: HttpClient, private authService: AuthServiceProvider) {}

    saveLaboratory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();
            let body = JSON.stringify(data);

            this.httpClient.post(environment.apiUrl + '/laboratory', body, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            })
        });
    }

    getLaboratories(): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();

            this.httpClient.get(environment.apiUrl + '/laboratory', httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    getLaboratory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();

            this.httpClient.get(environment.apiUrl + `/laboratory/${key}`, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    removeLaboratory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();

            this.httpClient.delete(environment.apiUrl + `/laboratory/${key}`, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    editLaboratory(key, data): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = this.authService.getOptions();
            let body = JSON.stringify(data);

            this.httpClient.put(environment.apiUrl + `/laboratory/${key}`, body, httpOptions).take(1).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            })
        });
    }

    searchLaboratories(startDay): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.authService.getUserJWTToken().then(token => {
            const httpOptions = {
                //headers: this.authService.getHeaders()
            };

                let body = JSON.stringify({
                    'timestamp': startDay
                });
                this.httpClient.post('https://us-central1-gestaolaboratorial.cloudfunctions.net/searchHours', body, httpOptions).take(1).subscribe((result) => {
                    resolve(result);
                }, (err) => {
                    reject(err);
                });
            // }).catch(error => {
            //     console.log('Could not get user token: ', error);
            //     reject();
            // });
        });
    }

    reserveLaboratory(laboratoryId, initialDay, startTime): Promise<any> {
        return new Promise((resolve, reject) => {
            const path = 'reserves/' + laboratoryId + '/' + initialDay;
            resolve();
            /*this.afDb.list(path).push({'startTime': startTime}).then(() => {
                resolve();
            });*/
        });
    }
}
