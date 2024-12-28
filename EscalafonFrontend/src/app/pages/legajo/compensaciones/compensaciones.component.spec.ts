import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensacionesComponent } from './compensaciones.component';

describe('CompensacionesComponent', () => {
  let component: CompensacionesComponent;
  let fixture: ComponentFixture<CompensacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompensacionesComponent]
    });
    fixture = TestBed.createComponent(CompensacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
