import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormPageComponent } from './new-form-page.component';

describe('NewFormPageComponent', () => {
  let component: NewFormPageComponent;
  let fixture: ComponentFixture<NewFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFormPageComponent]
    });
    fixture = TestBed.createComponent(NewFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
