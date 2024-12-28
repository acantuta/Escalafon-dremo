import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionLegajoComponent } from './ubicacion-legajo.component';

describe('UbicacionLegajoComponent', () => {
  let component: UbicacionLegajoComponent;
  let fixture: ComponentFixture<UbicacionLegajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionLegajoComponent]
    });
    fixture = TestBed.createComponent(UbicacionLegajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
