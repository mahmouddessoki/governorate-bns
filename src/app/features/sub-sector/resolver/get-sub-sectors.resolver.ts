import { RedirectCommand, ResolveFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { subSectorRes } from '../../../shared/models/info';
import { inject } from '@angular/core';
import { GovInfoService } from '../../../shared/services/gov-info.service';
import Swal from 'sweetalert2';

export const getSUbSectorsResolver: ResolveFn<Observable<subSectorRes>> = (
  route,
  state
) => {
  const govService = inject(GovInfoService);
  const router = inject(Router);
  const sector_id = route.params['id'];
  return govService.getSubSector(sector_id).pipe(
    map((res) => {
      if (res.data.sub_sectors.length == 0) {
        Swal.fire({
          title: 'لا توجد بيانات متوفره لهذا القطاع ستكون متاحه قريبا !',
          icon: 'info',
          timer: 4000,
          confirmButtonText: '! تجربة قطاع أخر  ',
          confirmButtonColor: '#F59E0B',
          timerProgressBar: true,
        });

        router.navigate(['/sectors'])
      }
      return res;
    })
  );
};
