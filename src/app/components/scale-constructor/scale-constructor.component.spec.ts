import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleConstructorComponent } from './scale-constructor.component';

describe('ScaleConstructorComponent', () => {
  let component: ScaleConstructorComponent;
  let fixture: ComponentFixture<ScaleConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleConstructorComponent]
    });
    fixture = TestBed.createComponent(ScaleConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
