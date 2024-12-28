import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooleanUtilsService {
  convertirABoolean(valor: boolean | string | number | null | undefined): boolean {
    if (typeof valor === 'boolean') return valor;
    if (typeof valor === 'string') return valor === '1' || valor.toLowerCase() === 'true';
    if (typeof valor === 'number') return valor === 1;
    return false;
  }
} 