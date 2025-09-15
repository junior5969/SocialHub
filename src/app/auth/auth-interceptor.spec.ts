import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { Auth } from './auth';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let authService: jasmine.SpyObj<Auth>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('Auth', ['getToken']);

    TestBed.configureTestingModule({
      providers: [{ provide: Auth, useValue: authSpy }]
    });

    authService = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
  });

it('dovrebbe aggiungere il token alla header se presente', (done) => {
  authService.getToken.and.returnValue('jwt-token');
  const request = new HttpRequest('GET', '/api/data');

  TestBed.runInInjectionContext(() => {
    authInterceptor(request, (req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer jwt-token');
      return of({} as HttpEvent<any>);
    }).subscribe(() => done());
  });
});

it('dovrebbe non modificare la request se non vi è token', (done) => {
  authService.getToken.and.returnValue(null);
  const request = new HttpRequest('GET', '/api/data');

  TestBed.runInInjectionContext(() => {
    authInterceptor(request, (req) => {
      expect(req.headers.has('Authorization')).toBeFalse();
      return of({} as HttpEvent<any>);
    }).subscribe(() => done());
  });
});
});
