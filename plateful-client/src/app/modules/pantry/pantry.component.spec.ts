import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryComponent } from './pantry.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

describe('PantryComponent', () => {
  let component: PantryComponent;
  let fixture: ComponentFixture<PantryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantryComponent, HeaderComponent, FooterComponent]
    });
    fixture = TestBed.createComponent(PantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
