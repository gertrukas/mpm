import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasCertificacionesComponent } from './las-certificaciones.component';

describe('LasCertificacionesComponent', () => {
  let component: LasCertificacionesComponent;
  let fixture: ComponentFixture<LasCertificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LasCertificacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LasCertificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
