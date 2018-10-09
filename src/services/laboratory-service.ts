import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import Utils from "../utils/utils";

@Injectable()
export class LaboratoryService {

    constructor(private afDb: AngularFireDatabase) {}

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
}
