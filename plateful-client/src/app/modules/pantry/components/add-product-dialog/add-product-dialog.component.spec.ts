import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddProductDialogComponent } from "./add-product-dialog.component";
import { MatButtonModule } from "@angular/material/button";

describe("AddProductDialogComponent", () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductDialogComponent],
      imports: [MatButtonModule],
    });
    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
