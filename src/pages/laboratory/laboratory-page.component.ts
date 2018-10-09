import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LaboratoryService} from "../../services/laboratory-service";
import {ToastrServiceProvider} from "../../services/toastr-service";

@Component({
  selector: 'app-laboratory-page',
  templateUrl: './laboratory-page.component.html',
  styleUrls: ['./laboratory-page.component.scss']
})
export class LaboratoryPageComponent {

    public id: string = "";
    public formGroup: FormGroup;
    public operatingHoursFormGroup: FormGroup;
    public operatingHours = {};
    public daysOfWeek: Array<any> = [];

    public categories: Array<any> = [];

    constructor(private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
                private laboratoryService: LaboratoryService, private toastrService: ToastrServiceProvider,
                private router: Router) {

        this.activeRoute.params.subscribe(params => {
            if (params.hasOwnProperty("id")) {
                this.id = params['id'];
            }
        });

        this.formGroup = formBuilder.group({
            'name': ['', [Validators.required]],
            'haveDatashow': [false],
            'haveComputer': [false]
        });

        this.operatingHoursFormGroup = this.formBuilder.group({
            dayOfWeek: ['monday', [Validators.required]],
            startTime: [0, [Validators.required]],
            endTime: [0, [Validators.required]]
        });

        this.daysOfWeek = this.daysOfWeek.concat([
            {
                value: 'monday',
                title: 'Segunda Feira'
            },
            {
                value: 'tuesday',
                title: 'Terça Feira'
            },
            {
                value: 'wednesday',
                title: 'Quarta Feira'
            },
            {
                value: 'thursday',
                title: 'Quinta Feira'
            },
            {
                value: 'friday',
                title: 'Sexta Feira'
            },
            {
                value: 'saturday',
                title: 'Sabado'
            },
            {
                value:'sunday',
                title: 'Domingo'
            }
        ]);
    }

    saveHour(data) {
        this.operatingHoursFormGroup.controls['dayOfWeek'].setValue("monday");
        this.operatingHoursFormGroup.controls['startTime'].setValue(0);
        this.operatingHoursFormGroup.controls['endTime'].setValue(0);

        if (!this.operatingHours[data.dayOfWeek]) {
            this.operatingHours[data.dayOfWeek] = [];
        }

        this.operatingHours[data.dayOfWeek].push({
            startTime: data.startTime,
            endTime: data.endTime
        });
    }

    saveLaboratory(data) {
        if (!this.id) {
            data.categories = this.categories;
            data.operatingHours = this.operatingHours;

            this.laboratoryService.saveLaboratory(data).then(() => {
                this.router.navigate(['/laboratories']).then(() => {
                    this.toastrService.showSuccessToast('Laboratório salvo com sucesso!');
                });
            }).catch((error) => {
                this.toastrService.showSuccessToast('Error ao salvar o laboratório!');
            });
        }
    }
}
