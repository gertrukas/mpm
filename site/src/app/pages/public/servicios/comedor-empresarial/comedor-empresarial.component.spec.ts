import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComedorEmpresarialComponent } from './comedor-empresarial.component';

describe('ComedorEmpresarialComponent', () => {
  let component: ComedorEmpresarialComponent;
  let fixture: ComponentFixture<ComedorEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComedorEmpresarialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComedorEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
