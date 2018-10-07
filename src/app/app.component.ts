import {Component} from '@angular/core';
import {AuthServiceProvider} from "../services/auth-service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    logged: Boolean = false;
    isLoading: Boolean = true;

    constructor(private authService: AuthServiceProvider) {

        this.authService.watchUser().subscribe((user) => {
            this.isLoading = false;
            this.logged = !!user;
        });
    }
}

