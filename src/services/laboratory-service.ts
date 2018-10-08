import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LaboratoryService {

    constructor(private afDb: AngularFireDatabase) {}

    saveLaboratory(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afDb.list('laboratory').push(data).then(() => {
                resolve();
            });
        });
    }
}
