import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {
  formatDate(date: string | Date | null, format: string = 'yyyy-MM-dd'): string {
    if (!date) return '';
    return formatDate(date, format, 'es-PE');
  }

  parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    return new Date(dateStr);
  }
} 