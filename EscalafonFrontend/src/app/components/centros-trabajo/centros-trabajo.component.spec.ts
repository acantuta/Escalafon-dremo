import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosTrabajoComponent } from './centros-trabajo.component';

describe('CentrosTrabajoComponent', () => {
  let component: CentrosTrabajoComponent;
  let fixture: ComponentFixture<CentrosTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentrosTrabajoComponent]
    });
    fixture = TestBed.createComponent(CentrosTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
