import { Component, OnInit } from "@angular/core";
import { ShoppingListService } from "./services/shopping-list.service";
import { User } from "src/app/interfaces/user.interface";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"],
})
export class ShoppingListComponent implements OnInit {
  public shoppingList: [
    {
      product: string;
      checked: boolean;
    }
  ] = [
    {
      product: "",
      checked: false,
    },
  ];
  public user!: User;

  constructor(private shoppingListService: ShoppingListService) {}

  public async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
    await this.shoppingListService.getShoppingList(this.user).subscribe(
      (
        data: [
          {
            product: string;
            checked: boolean;
          }
        ]
      ) => {
        this.shoppingList = data;
      }
    );
  }

  public addItemToShoppingList(): void {
    this.shoppingList.push({
      product: "",
      checked: false,
    });
  }

  public async deleteItem(index: number): Promise<void> {
    this.shoppingList.splice(index, 1);
    await this.shoppingListService
      .updateShoppingList(this.user, this.shoppingList)
      .subscribe((data: User) => {
        this.user = data;
        localStorage.setItem("USER_DATA", JSON.stringify(this.user));
      });
  }

  public async handleItemChange(event: Event, index: number): Promise<void> {
    const element = event.target as HTMLInputElement;

    this.shoppingList[index] = {
      product: element.value,
      checked: this.shoppingList[index].checked,
    };

    this.checkItemAlreadyInPantry({
      product: element.value,
      checked: this.shoppingList[index].checked,
    });
    await this.shoppingListService
      .updateShoppingList(this.user, this.shoppingList)
      .subscribe((data: User) => {
        this.user = data;
        localStorage.setItem("USER_DATA", JSON.stringify(this.user));
      });
  }

  public async handleItemCheck(
    event: MatCheckboxChange,
    index: number
  ): Promise<void> {
    this.shoppingList[index] = {
      product: this.shoppingList[index].product,
      checked: event.checked,
    };

    await this.shoppingListService
      .updateShoppingList(this.user, this.shoppingList)
      .subscribe((data: User) => {
        this.user = data;
        localStorage.setItem("USER_DATA", JSON.stringify(this.user));
      });
  }

  public checkItemAlreadyInPantry(item: {
    product: string;
    checked: boolean;
  }): boolean {
    let inPantry: boolean = false;
    this.user.products.forEach((product) => {
      if (product.name === item.product) {
        inPantry = true;
      }
    });

    return inPantry;
  }
}
