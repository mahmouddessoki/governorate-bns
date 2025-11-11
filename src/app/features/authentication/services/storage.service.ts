import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platform = inject(PLATFORM_ID);

  constructor() {}

  storeToken(token: string) {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem('gov-token', token);
    }
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platform)) {
      return localStorage.getItem('gov-token')!;
    }
    return null;
  }
}
