import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosBeneficiosComponent } from './servicios-beneficios.component';

describe('ServiciosBeneficiosComponent', () => {
  let component: ServiciosBeneficiosComponent;
  let fixture: ComponentFixture<ServiciosBeneficiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosBeneficiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosBeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
