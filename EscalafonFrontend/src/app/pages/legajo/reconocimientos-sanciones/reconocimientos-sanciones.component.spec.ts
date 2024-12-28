import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientosSancionesComponent } from './reconocimientos-sanciones.component';

describe('ReconocimientosSancionesComponent', () => {
  let component: ReconocimientosSancionesComponent;
  let fixture: ComponentFixture<ReconocimientosSancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReconocimientosSancionesComponent]
    });
    fixture = TestBed.createComponent(ReconocimientosSancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
