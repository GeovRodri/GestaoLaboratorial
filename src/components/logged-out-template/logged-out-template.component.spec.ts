import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { LoggedOutTemplateComponent } from './logged-out-template.component';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {AuthServiceProvider} from "../../services/auth-service";
import {ReactiveFormsModule} from "@angular/forms";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {environment} from "../../environments/environment";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {$QUESTION} from "codelyzer/angular/styles/chars";

describe('Login: Validação de usuario', () => {
    let component: LoggedOutTemplateComponent;
    let fixture: ComponentFixture<LoggedOutTemplateComponent>;
    let authService: AuthServiceProvider;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoggedOutTemplateComponent],
            imports: [
                ReactiveFormsModule,
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireDatabaseModule,
                AngularFireAuthModule
            ],
            providers: [
                AuthServiceProvider
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoggedOutTemplateComponent);
            component = fixture.componentInstance;
            authService = TestBed.get(AuthServiceProvider);
            spyOn(authService, 'login').and.callThrough();
        });

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    }));

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        fixture.detectChanges();
    });

    it('Entering email and password emits loggedIn event', () => {
        (<any> window).jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        fixture.whenStable().then(() => {
            component.loginFormGroup.controls['email'].setValue("teste@gmail.com");
            component.loginFormGroup.controls['password'].setValue("123456789");

            component.login(component.loginFormGroup.value);

            // Now we can check to make sure the emitted value is correct
            expect(authService.login).toHaveBeenCalled();
        });
    });
});
