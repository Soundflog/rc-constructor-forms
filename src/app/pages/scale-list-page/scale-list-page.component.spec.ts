import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleListPageComponent } from './scale-list-page.component';

describe('ScaleListPageComponent', () => {
  let component: ScaleListPageComponent;
  let fixture: ComponentFixture<ScaleListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleListPageComponent]
    });
    fixture = TestBed.createComponent(ScaleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
