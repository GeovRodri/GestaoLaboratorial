import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../services/laboratory-service";
import {ToastrServiceProvider} from "../../services/toastr-service";
import swal from "sweetalert2";
import {CategoryService} from "../../services/category-service";

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent {

    public categories: Array<any> = [];

    constructor(private categoryService: CategoryService, private toastrService: ToastrServiceProvider) {
        this.categoryService.getCategories().then((results) => {
            this.categories = results;
        }).catch((error) => {
            console.log(error);
            this.toastrService.showErrorToast('Error ao buscar as categorias!');
        })
    }

    removeCategory(data) {
        swal({
            text: 'Deseja realmente remover essa categoria?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.value) {
                this.categoryService.removeCategory(data.$key).then(() => {
                    const index = this.categories.findIndex((category) => category.$key === data.$key);
                    this.categories.splice(index, 1);
                    this.toastrService.showSuccessToast('Categoria removida com sucesso!');
                });
            }
        });
    }
}
