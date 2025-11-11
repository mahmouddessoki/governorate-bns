import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { StorageService } from '../../../features/authentication/services/storage.service';

export const userGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  if (storage.getToken() !== null) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('auth/login'));
};
