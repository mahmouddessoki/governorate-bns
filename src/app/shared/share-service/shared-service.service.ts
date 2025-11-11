import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  formatDateString(dateStr: string): string {
    if (!dateStr) return '';

    const date = new Date(dateStr);

    return formatDate(date, 'dd-MM-yyyy HH:mm', 'en-US');
  }


}
