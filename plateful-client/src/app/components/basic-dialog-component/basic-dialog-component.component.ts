import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
  title: string;
  options: {
    type: string;
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
  public isShareDialog: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<BasicDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.title = data.title;

    if (data.options?.payload) {
      this.options.payload = data.options.payload;

      this.productName = data.options.payload.productName;
      this.color = data.options.payload.color;
      this.hintText = data.options.payload.hintText;
    }

    if (data.options.type === "delete") {
      this.isShareDialog = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
