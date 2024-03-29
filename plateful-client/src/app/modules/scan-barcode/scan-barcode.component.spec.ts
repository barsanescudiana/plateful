import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScanBarcodeComponent } from "./scan-barcode.component";

import { BrowserModule } from "@angular/platform-browser";

describe("ScanBarcodeComponent", () => {
  let component: ScanBarcodeComponent;
  let fixture: ComponentFixture<ScanBarcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScanBarcodeComponent],
      imports: [BrowserModule],
    });
    fixture = TestBed.createComponent(ScanBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
