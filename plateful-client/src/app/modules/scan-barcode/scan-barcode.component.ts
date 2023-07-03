import {
  Component,
  SimpleChanges,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { BarcodeFormat } from "@zxing/library";
import { ScanService } from "./scan.service";
import { Product } from "src/app/interfaces/product.interface";

@Component({
  selector: "app-scan-barcode",
  templateUrl: "./scan-barcode.component.html",
  styleUrls: ["./scan-barcode.component.scss"],
})
export class ScanBarcodeComponent implements OnChanges {
  public value: string = "";
  public isError: boolean = false;
  public isEnabled: boolean = true;

  public scannedProduct: any;
  public productToAdd: Product | any;

  public allowedFormats = [BarcodeFormat.EAN_13];

  constructor(private scanService: ScanService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  public onError(error: any) {
    console.log("error", error);
    this.isError = true;
  }

  public onSuccess(event: any) {
    if (this.isEnabled) {
      this.scanService.getProductByBarcode(event).subscribe(
        (data) => {
          this.scannedProduct = data;
          this.isEnabled = false;
        },
        (error: any) => {
          if (error) {
            this.isError = true;
            this.isEnabled = false;
          }
        }
      );
    }
  }

  public onFailure(event: any) {
    console.log("failure", event);
  }

  public onComplete(event: any) {
    console.log("Complete", event);
  }
}
