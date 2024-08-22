import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolloDeProyectosComponent } from './desarrollo-de-proyectos.component';

describe('DesarrolloDeProyectosComponent', () => {
  let component: DesarrolloDeProyectosComponent;
  let fixture: ComponentFixture<DesarrolloDeProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesarrolloDeProyectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesarrolloDeProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
