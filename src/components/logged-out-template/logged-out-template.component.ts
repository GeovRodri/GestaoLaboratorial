import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceProvider} from "../../services/auth-service";

@Component({
  selector: 'app-logged-out-template',
  templateUrl: './logged-out-template.component.html',
  styleUrls: ['./logged-out-template.component.scss']
})
export class LoggedOutTemplateComponent implements OnDestroy {

    public loginFormGroup: FormGroup;
    public error: string = '';

    constructor(formBuilder: FormBuilder, private authService: AuthServiceProvider) {
        document.body.className = "bg-account-pages";

        this.loginFormGroup = formBuilder.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', Validators.required]
        });
    }

    ngOnDestroy(){
        document.body.className = "";
    }

    login(data) {
        this.authService.login(data.email, data.password).then(() => {
            document.body.className = "";
        }).catch(() => {
            this.error = "Verifique suas credenciais!"
        });
    }
}
