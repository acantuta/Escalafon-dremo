import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEscalafonComponent } from './gestion-escalafon.component';

describe('GestionEscalafonComponent', () => {
  let component: GestionEscalafonComponent;
  let fixture: ComponentFixture<GestionEscalafonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEscalafonComponent]
    });
    fixture = TestBed.createComponent(GestionEscalafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
