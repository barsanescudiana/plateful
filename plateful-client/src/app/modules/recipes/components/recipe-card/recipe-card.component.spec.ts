import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecipeCardComponent } from "./recipe-card.component";
import { SharedModule } from "src/app/components/shared.module";

describe("RecipeCardComponent", () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCardComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
