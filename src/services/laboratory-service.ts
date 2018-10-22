import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import Utils from "../utils/utils";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthServiceProvider} from "./auth-service";

@Injectable()
export class LaboratoryService {

    constructor(private afDb: AngularFireDatabase, private httpClient: HttpClient,
                private authService: AuthServiceProvider) {}

    saveLaboratory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.list('laboratories').push(data).then(() => {
                resolve();
            });
        });
    }

    getLaboratories(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.list('laboratories/').snapshotChanges().take(1).map(Utils.snapshotActionToData)
                .subscribe((results) => {
                resolve(results);
            }, (error) => {
                reject(error);
            });
        });
    }

    getLaboratory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.object('laboratories/' + key).snapshotChanges().take(1).map(Utils.snapshotActionObjectToData)
                .subscribe((result) => {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
        });
    }

    removeLaboratory(key): Promise<any> {
        return this.afDb.object('laboratories/' + key).remove() ;
    }

    editLaboratory(key, data): Promise<any> {
        return this.afDb.object('laboratories/' + key).update(data);
    }

    searchLaboratories(startDay): Promise<any> {
        return new Promise((resolve, reject) => {
            this.authService.getUserJWTToken().then(token => {
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Jwt-Token': token
                });

                let body = JSON.stringify({
                    'timestamp': startDay
                });
                this.httpClient.post('https://us-central1-gestaolaboratorial.cloudfunctions.net/searchHours', body, {headers: headers}).take(1).subscribe((result) => {
                    resolve(result);
                }, (err) => {
                    reject(err);
                });
            }).catch(error => {
                console.log('Could not get user token: ', error);
                reject();
            });
        });
    }

    reserveLaboratory(laboratoryId, initialDay, startTime): Promise<any> {
        return new Promise((resolve, reject) => {
            const path = 'reserves/' + laboratoryId + '/' + initialDay;
            this.afDb.list(path).push({'startTime': startTime}).then(() => {
                resolve();
            });
        });
    }
}
