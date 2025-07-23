// src/app/app.config.ts
import { ApplicationConfig, LOCALE_ID } from '@angular/core'; // <<< Import LOCALE_ID
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// <<< Import untuk Locale Data
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

// <<< Daftarkan data locale 'id'
registerLocaleData(localeId, 'id');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync(),
    // <<< Tambahkan Provider untuk LOCALE_ID
    { provide: LOCALE_ID, useValue: 'id' }
    // Jika Anda memiliki interceptor HTTP untuk auth, juga akan di sini:
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};
