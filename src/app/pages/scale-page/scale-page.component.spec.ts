import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalePageComponent } from './scale-page.component';

describe('ScalePageComponent', () => {
  let component: ScalePageComponent;
  let fixture: ComponentFixture<ScalePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalePageComponent]
    });
    fixture = TestBed.createComponent(ScalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
