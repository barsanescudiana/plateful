import { Component } from "@angular/core";
import { NgxBarcodeScannerService } from "@eisberg-labs/ngx-barcode-scanner";

@Component({
  selector: "app-scan-barcode",
  templateUrl: "./scan-barcode.component.html",
  styleUrls: ["./scan-barcode.component.scss"],
})
export class ScanBarcodeComponent {
  public value: string = "";
  public isError: boolean = false;

  public onError(error: any) {
    console.error(error);
    this.isError = true;
  }

  public onCodeScannerValueChange(event: any): void {
    console.log(event);
  }
}
