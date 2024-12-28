import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHojaVidaComponent } from './reporte-hoja-vida.component';

describe('ReporteHojaVidaComponent', () => {
  let component: ReporteHojaVidaComponent;
  let fixture: ComponentFixture<ReporteHojaVidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteHojaVidaComponent]
    });
    fixture = TestBed.createComponent(ReporteHojaVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
