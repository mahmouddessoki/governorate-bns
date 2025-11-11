import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GovInfoService } from '../../../shared/services/gov-info.service';

export const getSectorsResolver: ResolveFn<any> = (route, state) => {
  const govInfo = inject(GovInfoService);

  return govInfo.getMainInfo('main-sectors');
};
