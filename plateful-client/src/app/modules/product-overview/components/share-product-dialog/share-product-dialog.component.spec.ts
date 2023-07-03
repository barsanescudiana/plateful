import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShareProductDialogComponent } from "./share-product-dialog.component";
import { PantryModule } from "src/app/modules/pantry/pantry.module";

describe("ShareProductDialogComponent", () => {
  let component: ShareProductDialogComponent;
  let fixture: ComponentFixture<ShareProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareProductDialogComponent],
      imports: [PantryModule],
    });
    fixture = TestBed.createComponent(ShareProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
