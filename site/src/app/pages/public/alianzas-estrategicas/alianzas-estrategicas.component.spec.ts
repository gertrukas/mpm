import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlianzasEstrategicasComponent } from './alianzas-estrategicas.component';

describe('AlianzasEstrategicasComponent', () => {
  let component: AlianzasEstrategicasComponent;
  let fixture: ComponentFixture<AlianzasEstrategicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlianzasEstrategicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlianzasEstrategicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
