import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListItemComponent } from "./components/shopping-list-item/shopping-list-item.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

describe("ShoppingListComponent", () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListComponent, ShoppingListItemComponent],
      imports: [MatFormFieldModule, FormsModule],
    });
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
