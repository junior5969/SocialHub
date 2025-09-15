import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { loaderInterceptor } from './loader-interceptor';
import { LoaderService } from './loader-service';
import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('LoaderInterceptor', () => {
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const loaderSpy = jasmine.createSpyObj('LoaderService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LoaderService, useValue: loaderSpy }
      ]
    });

    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });


it('dovrebbe mostrare e nascondere il loader in caso di successo', fakeAsync(() => {
  const request = new HttpRequest('GET', '/api/data');

  TestBed.runInInjectionContext(() => {
    loaderInterceptor(request, () => of({} as HttpEvent<any>)).subscribe();
  });

  tick(); 
  expect(loaderService.show).toHaveBeenCalled();
  expect(loaderService.hide).toHaveBeenCalled();
}));

it('dovrebbe mostrare e nascondere il loader in caso di errore', fakeAsync(() => {
  const request = new HttpRequest('GET', '/api/data');

  TestBed.runInInjectionContext(() => {
    loaderInterceptor(request, () => throwError(() => new Error('Errore HTTP'))).subscribe({
      error: () => {}
    });
  });

  tick(); 
  expect(loaderService.show).toHaveBeenCalled();
  expect(loaderService.hide).toHaveBeenCalled();
}));

});
