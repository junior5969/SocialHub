import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('Auth Service', () => {
  let service: Auth;

  beforeEach(() => {
    localStorage.clear(); // pulisce token precedenti
    TestBed.configureTestingModule({
      providers: [
        Auth,
        provideRouter([{ path: 'login', loadComponent: () => import('../components/login/login.component').then(c => c.LoginComponent) }])
      ]
    });
    service = TestBed.inject(Auth);
  });

  it('dovrebbe inizialmente non essere autenticato', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('dovrebbe sapere se è autenticato dopo setToken', (done) => {
    service.setToken('xyz456');
    service.isAuthenticated$().subscribe(isAuth => {
      expect(isAuth).toBeTrue();
      done();
    });
  });

  it('dovrebbe restituire il token salvato con getToken', () => {
  service.setToken('myToken');
  expect(service.getToken()).toBe('myToken');
});

  it('dovrebbe rimuovere il token al logout', (done) => {
    service.setToken('abc123');
    service.logout();
    expect(service.getToken()).toBeNull();
    service.isAuthenticated$().subscribe(isAuth => {
      expect(isAuth).toBeFalse();
      done();
    });
  });
});
