import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader-service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LoaderService] });
    service = TestBed.inject(LoaderService);
  });

  it('dovrebbe inizialmente essere non visibile', (done) => {
    service.loading$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('dovrebbe mostrare lo spinner', (done) => {
    service.show();
    service.loading$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('dovrebbe nascondere lo spinner', (done) => {
    service.show();
    service.hide();
    service.loading$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });
});
