import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({
      scrollPositionRestoration: 'top',
    })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideEchartsCore({ echarts }),
    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'), // ✅ تحميل ديناميكي لـ ECharts
      })
    ),

  ]
};

