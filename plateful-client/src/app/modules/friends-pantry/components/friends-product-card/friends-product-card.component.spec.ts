import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsProductCardComponent } from './friends-product-card.component';

describe('FriendsProductCardComponent', () => {
  let component: FriendsProductCardComponent;
  let fixture: ComponentFixture<FriendsProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsProductCardComponent]
    });
    fixture = TestBed.createComponent(FriendsProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
