import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
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
    ],
    providers: [
      Auth,
      provideRouter([
        { path: 'users', component: LoginComponent } 
      ])
    ]
  }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(Auth);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe impostare il token e navigare al submit', () => {
    spyOn(authService, 'setToken');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ token: '12345' });
    component.onSubmit();

    expect(authService.setToken).toHaveBeenCalledWith('12345');
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('dovrebbe non chiamare setToken se il form non è valido', () => {
    spyOn(authService, 'setToken');
    spyOn(router, 'navigate');

    component.loginForm.setValue({ token: '' });
    component.onSubmit();

    expect(authService.setToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});