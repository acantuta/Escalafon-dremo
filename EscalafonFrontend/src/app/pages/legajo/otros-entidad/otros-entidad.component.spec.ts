import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosEntidadComponent } from './otros-entidad.component';

describe('OtrosEntidadComponent', () => {
  let component: OtrosEntidadComponent;
  let fixture: ComponentFixture<OtrosEntidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtrosEntidadComponent]
    });
    fixture = TestBed.createComponent(OtrosEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
