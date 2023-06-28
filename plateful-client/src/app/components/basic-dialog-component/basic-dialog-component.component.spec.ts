import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDialogComponentComponent } from './basic-dialog-component.component';

describe('BasicDialogComponentComponent', () => {
  let component: BasicDialogComponentComponent;
  let fixture: ComponentFixture<BasicDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicDialogComponentComponent]
    });
    fixture = TestBed.createComponent(BasicDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
