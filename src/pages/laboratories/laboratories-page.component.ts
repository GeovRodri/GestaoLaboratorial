import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../services/laboratory-service";
import {ToastrServiceProvider} from "../../services/toastr-service";
import swal from "sweetalert2";

@Component({
    selector: 'app-reserve-room-page',
    templateUrl: './laboratories-page.component.html',
    styleUrls: ['./laboratories-page.component.scss']
})
export class LaboratoriesPageComponent {

    public laboratories: Array<any> = [];

    constructor(private laboratoryService: LaboratoryService, private toastrService: ToastrServiceProvider) {
        this.laboratoryService.getLaboratories().then((results) => {
            this.laboratories = results;
        }).catch((error) => {
            console.log(error);
            this.toastrService.showErrorToast('Error ao buscar os laboratórios!');
        })
    }

    removeLaboratory(data) {
        swal({
            text: 'Deseja realmente remover esse laboratório?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.value) {
                this.laboratoryService.removeLaboratory(data.$key).then(() => {
                    const index = this.laboratories.findIndex((laboratory) => laboratory.$key === data.$key);
                    this.laboratories.splice(index, 1);
                    this.toastrService.showSuccessToast('Laboratório removido com sucesso!');
                });
            }
        });
    }
}
