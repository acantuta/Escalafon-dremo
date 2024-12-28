import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VLegajo } from '../../interfaces/v-legajo';

@Injectable({
  providedIn: 'root'
})
export class LegajoStateService {
  private legajoSubject = new BehaviorSubject<VLegajo | null>(null);
  legajo$ = this.legajoSubject.asObservable();

  setLegajo(legajo: VLegajo) {
    this.legajoSubject.next(legajo);
  }

  getLegajo(): Observable<VLegajo | null> {
    return this.legajo$;
  }

  clearLegajo() {
    this.legajoSubject.next(null);
  }
} 