import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserActivityService } from '../service/user-activity.service';

export const activityResolver: ResolveFn<any> = (route, state) => {

  const activity_service = inject(UserActivityService)
  return activity_service.getUserActivities(1);
};
