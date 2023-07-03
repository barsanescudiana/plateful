import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteScanComponent } from './complete-scan.component';

describe('CompleteScanComponent', () => {
  let component: CompleteScanComponent;
  let fixture: ComponentFixture<CompleteScanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteScanComponent]
    });
    fixture = TestBed.createComponent(CompleteScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
