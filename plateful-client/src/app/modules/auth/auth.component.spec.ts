import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthComponent } from "./auth.component";
import {
  SocialLoginModule,
  GoogleSigninButtonModule,
} from "@abacritt/angularx-social-login";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

describe("AuthComponent", () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        SocialLoginModule,
        GoogleSigninButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
      ],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
