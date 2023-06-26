import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";

interface DialogData {
  title: string;
  options?: {
    payload?: any;
  };
}

@Component({
  selector: "app-add-product-dialog",
  templateUrl: "./add-product-dialog.component.html",
  styleUrls: ["./add-product-dialog.component.scss"],
})
export class AddProductDialogComponent {
  public title: string = "";
  public options: { payload?: string } = {};

  public addMethod: string = "";
  public addOptions: { title: string; src: string }[] = [
    {
      title: "Scan barcode",
      src: "assets/icons/scan.svg",
    },
    {
      title: "Add manually",
      src: "assets/icons/contract.svg",
    },
  ];

  public selectedOption: string = "";

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.title = data.title;

    if (data.options) {
      this.options = data.options;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public handleOptionClick(option: string): void {
    this.selectedOption = option;
  }
}
