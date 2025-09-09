import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    // catch gli errori
    catchError((error: HttpErrorResponse) => {
      let message = 'Si è verificato un errore';
      if (error.error && error.error.message) {
        message = error.error.message;
      } else if (error.statusText) {
        message = error.statusText;
      }

      alert(`Errore ${error.status}: ${message}`);
      throw error; // rilancia l’errore se serve
    })
  );
};
