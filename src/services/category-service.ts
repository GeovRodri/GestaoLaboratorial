import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import Utils from "../utils/utils";

@Injectable()
export class CategoryService {

    constructor(private afDb: AngularFireDatabase) {}

    saveCategory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.object('categories/' + data.name).set(true).then(() => {
                resolve();
            });
        });
    }

    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.list('categories/').snapshotChanges().take(1).map(Utils.snapshotActionToData)
                .subscribe((results) => {
                resolve(results);
            }, (error) => {
                reject(error);
            });
        });
    }

    getCategory(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.object('categories/' + key).snapshotChanges().take(1).map(Utils.snapshotActionObjectToData)
                .subscribe((result) => {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
        });
    }

    removeCategory(key): Promise<any> {
        return this.afDb.object('categories/' + key).remove() ;
    }

    /*editCategory(key, data): Promise<any> {
        return this.afDb.object('categories/' + key).update(data);
    }*/
}
