import { ResolveFn } from '@angular/router';
import { infoRes } from '../../../shared/models/info';
import { inject } from '@angular/core';
import { GovInfoService } from '../../../shared/services/gov-info.service';

export const getGovsResolver: ResolveFn<any> = (route, state) => {
  const govInfo = inject(GovInfoService);

  return govInfo.getMainInfo('governorates');
};
