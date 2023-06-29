import { TestBed } from '@angular/core/testing';

import { FriendsPantryService } from './friends-pantry.service';

describe('FriendsPantryService', () => {
  let service: FriendsPantryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsPantryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
