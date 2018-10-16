import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Utils from "../../utils/utils";
declare var $: any;

@Component({
    selector: 'app-reserve-room-page',
    templateUrl: './reserve-room-page.component.html',
    styleUrls: ['./reserve-room-page.component.scss']
})
export class ReserveRoomPageComponent {

    public searchFormGroup: FormGroup;
    public daysOfWeek: Array<any> = [];

    constructor(private formBuilder: FormBuilder) {
        this.daysOfWeek = Utils.getDaysOfWeek();
        this.searchFormGroup = formBuilder.group({
            'dayOfWeek': [''],
            'startTime': ['00:00']
        });
    }

    search(data) {
        $('#wizard a[href="#select"]').tab('show')
    }
}
