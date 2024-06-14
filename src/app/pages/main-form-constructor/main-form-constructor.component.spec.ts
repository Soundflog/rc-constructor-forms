import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormConstructorComponent } from './main-form-constructor.component';

describe('MainFormConstructorComponent', () => {
  let component: MainFormConstructorComponent;
  let fixture: ComponentFixture<MainFormConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainFormConstructorComponent]
    });
    fixture = TestBed.createComponent(MainFormConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
