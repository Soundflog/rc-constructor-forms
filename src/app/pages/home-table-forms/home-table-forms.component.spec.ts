import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTableFormsComponent } from './home-table-forms.component';

describe('HomeTableFormsComponent', () => {
  let component: HomeTableFormsComponent;
  let fixture: ComponentFixture<HomeTableFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTableFormsComponent]
    });
    fixture = TestBed.createComponent(HomeTableFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
