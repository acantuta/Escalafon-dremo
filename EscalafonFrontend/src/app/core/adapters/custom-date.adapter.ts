// src/app/custom-date-adapter.ts
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override deserialize(value: any): Date | null {
    if (!value) return null;

    // Si ya es un objeto Date, retornarlo
    if (value instanceof Date) {
      return value;
    }

    // Si es string, intentar parsearlo
    if (typeof value === 'string') {
      // Remover cualquier hora/timezone si existe
      const dateStr = value.split('T')[0];
      
      if (dateStr.includes('-')) {
        const [year, month, day] = dateStr.split('-').map(part => Number(part));
        // Crear la fecha al mediodía para evitar problemas de zona horaria
        return new Date(year, month - 1, day, 12, 0, 0);
      }
    }

    // Si no se pudo parsear, intentar con el método padre
    return super.deserialize(value);
  }
  

  override parse(value: string): Date | null {
    if (!value) return null;
    
    // Para fechas ingresadas manualmente en formato DD/MM/YYYY
    if (typeof value === 'string') {
      const [day, month, year] = value.split('/').map(Number);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month - 1, day, 12, 0, 0);
      }
    }
    
    return super.parse(value);
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Forzar formato dd/MM/yyyy para todos los casos
    return `${day}/${month}/${year}`;
  }
}
