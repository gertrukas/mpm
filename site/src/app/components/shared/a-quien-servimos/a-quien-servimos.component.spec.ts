import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AQuienServimosComponent } from './a-quien-servimos.component';

describe('AQuienServimosComponent', () => {
  let component: AQuienServimosComponent;
  let fixture: ComponentFixture<AQuienServimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AQuienServimosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AQuienServimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
