import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionConstructorComponent } from './question-constructor.component';

describe('QuestionConstructorComponent', () => {
  let component: QuestionConstructorComponent;
  let fixture: ComponentFixture<QuestionConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionConstructorComponent]
    });
    fixture = TestBed.createComponent(QuestionConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
