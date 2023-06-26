import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Storage } from "src/app/enums/storage.enum";
import { Product } from "src/app/interfaces/product.interface";
import { User } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-pantry-menu",
  templateUrl: "./pantry-menu.component.html",
  styleUrls: ["./pantry-menu.component.scss"],
})
export class PantryMenuComponent {
  @Input() public user: User | undefined;
  @Input() public products: Product[] | any[] = [];
  public storageOptions: string[] = ["All", "Fridge", "Freezer", "Dry pantry"];
  public selectedOption: string = "All";

  @Input() public fridgeProducts: Product[] = [];
  @Input() public freezerProducts: Product[] = [];
  @Input() public dryProducts: Product[] = [];

  @Output() onMenuChange: EventEmitter<string> = new EventEmitter<string>();

  public handleOptionClick(option: string): void {
    this.selectedOption = option;
    this.onMenuChange.emit(option);
  }
}
