import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withNavigationErrorHandler,
} from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from './app.routes';
// animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
// interceptor
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { addTokenInterceptor } from './core/interceptors/token/add-token.interceptor';
// toasters
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSweetAlert2({
      // Optional configuration
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      withComponentInputBinding(),
      withNavigationErrorHandler((err) => {
        Swal.fire({
          title: 'حدث خطأ اثناء استعادة البيانات المطلوبه',
          icon: 'error',
          timer: 4000,
          confirmButtonText: '!المحاولة مرة اخرى',
          confirmButtonColor: '#F59E0B',
          timerProgressBar: true,
        });
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([addTokenInterceptor, loadingInterceptor])
    ),
    importProvidersFrom(NgxSpinnerModule, BrowserAnimationsModule),
  ],
};
