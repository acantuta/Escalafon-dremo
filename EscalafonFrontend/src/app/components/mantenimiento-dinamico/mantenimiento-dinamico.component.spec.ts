import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoDinamicoComponent } from './mantenimiento-dinamico.component';

describe('MantenimientoDinamicoComponent', () => {
  let component: MantenimientoDinamicoComponent;
  let fixture: ComponentFixture<MantenimientoDinamicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoDinamicoComponent]
    });
    fixture = TestBed.createComponent(MantenimientoDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
