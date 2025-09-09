import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { authInterceptor } from './auth/auth-interceptor';

import { loaderInterceptor } from './service/loader-interceptor';
import { errorInterceptor } from './service/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
       loaderInterceptor,
       authInterceptor,
      errorInterceptor])),
  ]
};
