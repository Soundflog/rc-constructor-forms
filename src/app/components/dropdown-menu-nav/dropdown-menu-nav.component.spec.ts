import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuNavComponent } from './dropdown-menu-nav.component';

describe('DropdownMenuNavComponent', () => {
  let component: DropdownMenuNavComponent;
  let fixture: ComponentFixture<DropdownMenuNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownMenuNavComponent]
    });
    fixture = TestBed.createComponent(DropdownMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
