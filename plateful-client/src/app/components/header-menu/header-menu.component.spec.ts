import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuComponent } from './header-menu.component';
import {MatButtonModule} from '@angular/material/button';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuComponent],
      imports: [MatButtonModule]
    });
    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
