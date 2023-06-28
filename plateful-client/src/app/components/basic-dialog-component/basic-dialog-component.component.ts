import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
  title: string;
  options?: {
    payload?: any;
  };
}

@Component({
  selector: "app-basic-dialog-component",
  templateUrl: "./basic-dialog-component.component.html",
  styleUrls: ["./basic-dialog-component.component.scss"],
})
export class BasicDialogComponentComponent {
  public title: string = "";
  public options: { payload: {} } = { payload: {} };
  public productName: string | any;
  public color: string = "";
  public hintText = "";

  public selectedOption: string = "";

  constructor(
    public dialogRef: MatDialogRef<BasicDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.title = data.title;

    if (data.options && this.options.payload) {
      this.options.payload = data.options.payload;

      this.productName = data.options.payload.productName;
      this.color = data.options.payload.color;
      this.hintText = data.options.payload.hintText;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
