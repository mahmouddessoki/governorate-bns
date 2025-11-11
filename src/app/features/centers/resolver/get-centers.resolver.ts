import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GovInfoService } from '../../../shared/services/gov-info.service';
import { Observable } from 'rxjs';
import { infoRes } from '../../../shared/models/info';

export const getCentersResolver: ResolveFn<Observable<infoRes>> = (
  route,
  state
) => {
  const govInfo = inject(GovInfoService);

  return govInfo.getMainInfo('centers');
};
