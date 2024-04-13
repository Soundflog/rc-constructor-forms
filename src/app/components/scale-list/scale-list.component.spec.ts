import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleListComponent } from './scale-list.component';

describe('ScaleListComponent', () => {
  let component: ScaleListComponent;
  let fixture: ComponentFixture<ScaleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleListComponent]
    });
    fixture = TestBed.createComponent(ScaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
