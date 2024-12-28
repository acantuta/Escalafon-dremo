import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServidorPublicoComponent } from './servidor-publico.component';

describe('ServidorPublicoComponent', () => {
  let component: ServidorPublicoComponent;
  let fixture: ComponentFixture<ServidorPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServidorPublicoComponent]
    });
    fixture = TestBed.createComponent(ServidorPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
