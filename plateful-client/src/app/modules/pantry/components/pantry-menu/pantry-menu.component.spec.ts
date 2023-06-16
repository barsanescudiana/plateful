import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryMenuComponent } from './pantry-menu.component';

describe('PantryMenuComponent', () => {
  let component: PantryMenuComponent;
  let fixture: ComponentFixture<PantryMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantryMenuComponent]
    });
    fixture = TestBed.createComponent(PantryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
