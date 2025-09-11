import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login.component';
import { Auth } from '../../auth/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Auth;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [Auth]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(Auth);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set token and navigate on submit', () => {
    spyOn(authService, 'setToken');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ token: '12345' });
    component.onSubmit();

    expect(authService.setToken).toHaveBeenCalledWith('12345');
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should not call setToken if form is invalid', () => {
    spyOn(authService, 'setToken');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ token: '' }); // invalid
    component.onSubmit();

    expect(authService.setToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});