import { Injectable } from '@angular/core';
import { Adapter } from '../models/adapter';
import { chartRes } from '../models/chart';

@Injectable({
  providedIn: 'root',
})
export class ResponseAdapterService implements Adapter {
  constructor() {}

  adapt(response: chartRes): any {
    let adaptedResponse: any = {};

    if (
      Array.isArray(response?.data?.villages_stats) &&
      response.data.villages_stats.length > 0
    ) {
      adaptedResponse = {
        barChartData: response.data.villages_stats,
        governoratesData: response.data.local_units_stats ?? [],
        allCentersData: response.data.centers_stats ?? [],
      };
      console.log('Adapted Response for Villages:', adaptedResponse);
    }
    if (
      Array.isArray(response?.data?.local_units_stats) &&
      !Array.isArray(response?.data?.villages_stats) &&
      response.data.local_units_stats.length > 0
    ) {
      adaptedResponse = {
        barChartData: response.data.local_units_stats,
        governoratesData: response.data.centers_stats ?? [],
        allCentersData: response.data.centers_stats ?? [],
      };
      console.log('Adapted Response for Local Units:', adaptedResponse);
    }
    if (
      Array.isArray(response?.data?.centers_stats) &&
      !Array.isArray(response?.data?.local_units_stats) &&
      response.data.centers_stats.length > 0
    ) {
      adaptedResponse = {
        barChartData: response.data.centers_stats,
        governoratesData: [response.data.governorate_stats],
        allCentersData: response.data.centers_stats ?? [],
      };
      console.log('Adapted Response for Centers:', adaptedResponse);
    }
    console.log('Adapted Response:', adaptedResponse);
    return adaptedResponse;
  }
}
