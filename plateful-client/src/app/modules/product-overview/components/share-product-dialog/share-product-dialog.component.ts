import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product } from "src/app/interfaces/product.interface";
interface DialogData {
  title: string;
  options?: {
    payload?: any;
    type: string;
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

  public isShareDialog: boolean = true;
  public isClaimDialog: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ShareProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.title = data.title;

    if (data.options?.payload) {
      this.options.payload = data.options.payload;

      this.product = data.options.payload.product;
      this.color = data.options.payload.color;
    }

    if (data.options?.type === "delete") {
      this.isShareDialog = false;
      this.isClaimDialog = false;
    }

    if (data.options?.type === "claim") {
      this.isShareDialog = false;
      this.isClaimDialog = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
