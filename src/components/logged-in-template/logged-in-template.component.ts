import { Component } from '@angular/core';
import {AuthServiceProvider} from "../../services/auth-service";
import {UsersService} from "../../services/user-service";

@Component({
  selector: 'app-logged-in-template',
  templateUrl: './logged-in-template.component.html',
  styleUrls: ['./logged-in-template.component.scss']
})
export class LoggedInTemplateComponent {

    public isAdmin: boolean = false;

    constructor(private authService: AuthServiceProvider, private userService: UsersService) {
        this.authService.isAdmin().then((isAdmin) => {
            this.isAdmin = !!isAdmin;
        }).catch((error) => {
           console.log(error);
        });
    }

    logout() {
        this.userService.logout();
    }
}
