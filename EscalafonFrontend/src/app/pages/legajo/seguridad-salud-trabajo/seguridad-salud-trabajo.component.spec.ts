import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadSaludTrabajoComponent } from './seguridad-salud-trabajo.component';

describe('SeguridadSaludTrabajoComponent', () => {
  let component: SeguridadSaludTrabajoComponent;
  let fixture: ComponentFixture<SeguridadSaludTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguridadSaludTrabajoComponent]
    });
    fixture = TestBed.createComponent(SeguridadSaludTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
