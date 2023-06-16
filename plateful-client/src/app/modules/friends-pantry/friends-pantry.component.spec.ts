import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPantryComponent } from './friends-pantry.component';

describe('FriendsPantryComponent', () => {
  let component: FriendsPantryComponent;
  let fixture: ComponentFixture<FriendsPantryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsPantryComponent]
    });
    fixture = TestBed.createComponent(FriendsPantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
