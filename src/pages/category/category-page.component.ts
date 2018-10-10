import { Component, } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrServiceProvider} from "../../services/toastr-service";
import {CategoryService} from "../../services/category-service";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

    public id: string = "";
    public formGroup: FormGroup;

    constructor(private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
                private categoryService: CategoryService, private toastrService: ToastrServiceProvider,
                private router: Router) {

        this.formGroup = formBuilder.group({
            'name': ['', [Validators.required]]
        });

        this.activeRoute.params.subscribe(params => {
            if (params.hasOwnProperty("id")) {
                this.id = params['id'];

                this.categoryService.getCategory(this.id).then((category) => {
                    this.formGroup.controls['name'].setValue(category.$key);
                });
            }
        });
    }

    saveCategory(data) {
        let promises = [];

        if (this.id) {
            // promises.push(this.categoryService.editCategory(this.id, data));
        } else {
            promises.push(this.categoryService.saveCategory(data));
        }

        Promise.all(promises).then(() => {
            this.router.navigate(['/categories']).then(() => {
                this.toastrService.showSuccessToast('Categoria salva com sucesso!');
            });
        }).catch((error) => {
            this.toastrService.showSuccessToast('Error ao salvar a categoria!');
        });
    }
}
