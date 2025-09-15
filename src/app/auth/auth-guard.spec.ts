import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Auth } from './auth';
import { authGuard } from './auth-guard';

describe('AuthGuard', () => {
  let authService: jasmine.SpyObj<Auth>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('Auth', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

it('dovrebbe permettere accesso se autenticato', () => {
  authService.isAuthenticated.and.returnValue(true);

  const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  expect(result).toBeTrue();
  expect(router.navigate).not.toHaveBeenCalled();
});

it('dovrebbe reindirizzare al login se non autenticato', () => {
  authService.isAuthenticated.and.returnValue(false);

  const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  expect(result).toBeFalse();
  expect(router.navigate).toHaveBeenCalledWith(['/login']);
});
});
