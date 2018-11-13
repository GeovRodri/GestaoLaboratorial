import {Component} from '@angular/core';
import {AuthServiceProvider} from "../services/auth-service";
import {UsersService} from "../services/user-service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    logged: Boolean = false;
    isLoading: Boolean = false;

    constructor(private authService: AuthServiceProvider, private userService: UsersService) {
        this.authService.watchUser().subscribe((user) => {
            this.isLoading = false;
            this.logged = !!user;
        });
    }
}

