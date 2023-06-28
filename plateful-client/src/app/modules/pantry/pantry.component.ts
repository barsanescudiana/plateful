import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "src/app/interfaces/user.interface";
import { AddProductDialogComponent } from "./components/add-product-dialog/add-product-dialog.component";
import { Router } from "@angular/router";
import { Product } from "src/app/interfaces/product.interface";
import { PantryService } from "./services/pantry.service";
import { Storage } from "src/app/enums/storage.enum";

@Component({
  selector: "app-pantry",
  templateUrl: "./pantry.component.html",
  styleUrls: ["./pantry.component.scss"],
})
export class PantryComponent implements OnInit {
  public user: User | undefined;
  public filters: string[] = ["Filter", "Sort"];
  public selectedFilter: string = "";

  public products: Product[] = [];
  public fridgeProducts: Product[] = [];
  public freezerProducts: Product[] = [];
  public dryProducts: Product[] = [];

  public searchValue: string = "";
  public selectedMenuItem: string = "All";

  private allProducts: Product[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private pantryService: PantryService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);

    if (this.user) {
      await this.pantryService
        .getProductsForUser(this.user.id)
        .subscribe((data: Product[]) => {
          data.forEach((product: Product) => {
            product.expirationDate = new Date(
              product.expirationDate!
            ).toString();
          });
          this.allProducts = data.sort((first, second) => {
            return (
              new Date(first.expirationDate!).getTime() -
              new Date(second.expirationDate!).getTime()
            );
          });
          this.products = data.sort((first, second) => {
            return (
              new Date(first.expirationDate!).getTime() -
              new Date(second.expirationDate!).getTime()
            );
          });
          this.products.forEach((product: Product) => {
            switch (product.storage) {
              case Storage.FRIDGE:
                this.fridgeProducts.push(product);
                break;
              case Storage.FREEZER:
                this.freezerProducts.push(product);
                break;
              case Storage.PANTRY:
                this.dryProducts.push(product);
                break;
            }
          });
        });
    }
  }

  public handleFilterSelection(filter: string) {
    if (this.selectedFilter === filter) {
      this.selectedFilter = "";
    } else {
      this.selectedFilter = filter;
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: {
        title: "Choose how you want to add products",
        options: {
          payload: "",
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "Scan barcode") {
        this.router.navigateByUrl("/scan");
      } else {
        this.router.navigateByUrl("/add");
      }
    });
  }

  public handleMenuChange(event: string): void {
    this.selectedMenuItem = event;
    switch (event) {
      case Storage.FRIDGE:
        this.products = this.fridgeProducts;
        break;
      case Storage.FREEZER:
        this.products = this.freezerProducts;
        break;
      case Storage.PANTRY:
        this.products = this.dryProducts;
        break;
      case "All":
        this.products = this.allProducts;
        break;
    }
  }

  public filterArray(arrayToFilter: string) {
    switch (arrayToFilter) {
      case Storage.FRIDGE:
        this.products = this.fridgeProducts.filter((item) => {
          return item.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
      case Storage.FREEZER:
        this.products = this.freezerProducts.filter((item) => {
          return item.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
      case Storage.PANTRY:
        this.products = this.dryProducts.filter((item) => {
          return item.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
      case "All":
        this.products = this.allProducts.filter((item) => {
          return item.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
    }
  }
}
