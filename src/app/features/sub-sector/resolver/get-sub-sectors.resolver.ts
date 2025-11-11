import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { subSectorRes } from '../../../shared/models/info';
import { inject } from '@angular/core';
import { GovInfoService } from '../../../shared/services/gov-info.service';

export const getSUbSectorsResolver: ResolveFn<Observable<subSectorRes>> = (route, state) => {
  const govService = inject(GovInfoService)
  const sector_id = route.params['id'];
  return govService.getSubSector(sector_id);
};
