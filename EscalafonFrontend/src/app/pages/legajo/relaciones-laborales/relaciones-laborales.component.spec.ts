import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesLaboralesComponent } from './relaciones-laborales.component';

describe('RelacionesLaboralesComponent', () => {
  let component: RelacionesLaboralesComponent;
  let fixture: ComponentFixture<RelacionesLaboralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelacionesLaboralesComponent]
    });
    fixture = TestBed.createComponent(RelacionesLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
