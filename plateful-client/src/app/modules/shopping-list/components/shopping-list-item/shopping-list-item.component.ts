import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-shopping-list-item",
  templateUrl: "./shopping-list-item.component.html",
  styleUrls: ["./shopping-list-item.component.scss"],
})
export class ShoppingListItemComponent implements OnChanges {
  @Input() public item: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  public handleItemNameChange(event: any) {
    console.log(event);
  }
}
