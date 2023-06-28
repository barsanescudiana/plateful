import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product } from "src/app/interfaces/product.interface";
interface DialogData {
  title: string;
  options?: {
    payload?: any;
  };
}
@Component({
  selector: "app-share-product-dialog",
  templateUrl: "./share-product-dialog.component.html",
  styleUrls: ["./share-product-dialog.component.scss"],
})
export class ShareProductDialogComponent {
  public title: string = "";
  public options: { payload: {} } = { payload: {} };
  public product: Product | any;
  public color: string = "";

  constructor(
    public dialogRef: MatDialogRef<ShareProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.title = data.title;

    if (data.options && this.options.payload) {
      this.options.payload = data.options.payload;

      this.product = data.options.payload.product;
      this.color = data.options.payload.color;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
