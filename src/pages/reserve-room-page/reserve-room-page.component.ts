import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Utils from "../../utils/utils";
declare var $: any;
import * as moment from 'moment';
import {LaboratoryService} from "../../services/laboratory-service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
    selector: 'app-reserve-room-page',
    templateUrl: './reserve-room-page.component.html',
    styleUrls: ['./reserve-room-page.component.scss']
})
export class ReserveRoomPageComponent {

    public isLoading: boolean = false;
    public searchFormGroup: FormGroup;
    public daysOfWeek: Array<any> = [];
    public hours: Array<any> = [];
    public hoursSelected: Array<any> = [];
    public startDay;

    constructor(private formBuilder: FormBuilder, private laboratoryService: LaboratoryService,
                private router: Router) {
        this.daysOfWeek = Utils.getDaysOfWeek();
        this.searchFormGroup = formBuilder.group({
            'date': [moment().format('YYYY-MM-DD')]
        });
    }

    public search(data) {
        this.isLoading = true;
        this.startDay = moment(data.date).utc(true).startOf('day').valueOf();
        this.laboratoryService.searchLaboratories(this.startDay).then((results: Array<any>) => {
            this.isLoading = false;
            console.log(results);
            this.hours = results;

            if (results.length > 0) {
                $('#wizard a[href="#select"]').tab('show');
            } else {
                swal({text: 'Não existe horários disponíveis nesse dia.'});
            }
        }).catch((error) => {
            this.isLoading = false;
        });
    }

    public toConfirm() {
        $('#wizard a[href="#confirm"]').tab('show');
    }

    public selectHour(hour, event) {
        if (event.target.checked) {
            this.hoursSelected.push(hour);
        } else {
            const idx = this.hoursSelected.indexOf(hour);
            this.hoursSelected.splice(idx, 1);
        }
    }

    public save() {
        let promises = [];

        this.hoursSelected.forEach((hour) => {
            promises.push(this.laboratoryService.reserveLaboratory(hour.laboratoryId, this.startDay, hour.startTime));
        });

        Promise.all(promises).then(() => {
            $('#wizard a[href="#search"]').tab('show');
            this.hoursSelected =[];
            this.hours = [];
            this.startDay = null;

            this.router.navigate(['/']).then(() => {
                swal({text: 'Laboratório(s) reservado(s) com sucesso!', type: 'success'});
            });
        });
    }
}
