import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleConstructorPageComponent } from './scale-constructor-page.component';

describe('ScaleConstructorPageComponent', () => {
  let component: ScaleConstructorPageComponent;
  let fixture: ComponentFixture<ScaleConstructorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleConstructorPageComponent]
    });
    fixture = TestBed.createComponent(ScaleConstructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
