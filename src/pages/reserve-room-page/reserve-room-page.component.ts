import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Utils from "../../utils/utils";
declare var $: any;
import * as moment from 'moment';
import {LaboratoryService} from "../../services/laboratory-service";
import swal from "sweetalert2";

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

    constructor(private formBuilder: FormBuilder, private laboratoryService: LaboratoryService) {
        this.daysOfWeek = Utils.getDaysOfWeek();
        this.searchFormGroup = formBuilder.group({
            'date': [moment().format('YYYY-MM-DD')]
        });
    }

    public search(data) {
        this.isLoading = true;
        let timestamp = moment(data.date).startOf('day').valueOf();
        this.laboratoryService.searchLaboratories(timestamp).then((results: Array<any>) => {
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
}
