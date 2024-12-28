import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosPersonalComponent } from './movimientos-personal.component';

describe('MovimientosPersonalComponent', () => {
  let component: MovimientosPersonalComponent;
  let fixture: ComponentFixture<MovimientosPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientosPersonalComponent]
    });
    fixture = TestBed.createComponent(MovimientosPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
