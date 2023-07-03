import { Component, Input, OnInit } from "@angular/core";
import { Storage } from "src/app/enums/storage.enum";
import { NutritionalValues } from "src/app/interfaces/nutritional-values.interface";
import { Product } from "src/app/interfaces/product.interface";

@Component({
  selector: "app-complete-scan",
  templateUrl: "./complete-scan.component.html",
  styleUrls: ["./complete-scan.component.scss"],
})
export class CompleteScanComponent implements OnInit {
  @Input() public scannedProduct: any;
  public hasMissingAttributes: boolean = false;

  public productToAdd: Product = {
    isShared: false,
    isClaimed: false,
    dateAdded: new Date(),
  };

  public missingAttributes: string[] = [];

  public measurementUnits: any[] = [
    {
      name: "grams",
      short: "g",
    },
    {
      name: "kilograms",
      short: "kg",
    },
    {
      name: "milliliters",
      short: "ml",
    },
    {
      name: "liters",
      short: "l",
    },
    {
      name: "slice",
      short: "slice",
    },
    {
      name: "pack",
      short: "pack",
    },
  ];

  public categories: string[] = [
    "Meat",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Grains",
    "Beverages",
    "Sweets",
    "Snacks",
  ];

  ngOnInit(): void {
    console.log(this.scannedProduct);

    if (this.scannedProduct) {
      this.productToAdd.name = this.scannedProduct.name;
      this.productToAdd.expirationDate = this.scannedProduct.expirationDate;
      this.productToAdd.quantity = this.scannedProduct.quantity.split(
        " "
      )[0] as unknown as number;
      this.productToAdd.measurement =
        this.scannedProduct.quantity.split(" ")[1];
      if (this.scannedProduct.nutriments) {
        this.productToAdd.nutritionalValues = this.scannedProduct.nutriments;
      }
    }

    this.scannedProduct.categories.forEach((category: string) => {
      console.log(category);
      if (this.categories.includes(category.trim())) {
        this.productToAdd.category = category.trim();
      }
    });

    const emptyProduct: Product = {
      name: "",
      category: "",
      id: "",
      expirationDate: "",
      quantity: 0,
      measurement: "",
      storage: Storage.PANTRY,
      nutritionalValues: {} as unknown as NutritionalValues,
      isShared: false,
      isClaimed: false,
      dateAdded: new Date(),
    };
    type ProductAttributes = keyof Product;
    const attributeCount: number = Object.keys({} as ProductAttributes).length;

    if (
      Object.keys(emptyProduct).length > Object.keys(this.productToAdd).length
    ) {
      this.hasMissingAttributes = true;
    }

    if (
      this.findMissingAttributes(this.productToAdd, emptyProduct).length > 1
    ) {
      this.findMissingAttributes(this.productToAdd, emptyProduct).forEach(
        (attribute) => {
          if (attribute !== "id") {
            this.missingAttributes.push(attribute);
          }
        }
      );
    }

    console.log(Object.keys(emptyProduct).length); // Output: 10
    console.log(Object.keys(this.productToAdd).length);

    console.log(this.productToAdd);
  }

  public findMissingAttributes(
    obj: Partial<Product>,
    emptyProduct: Product
  ): string[] {
    const productKeys = Object.keys(emptyProduct as Product);
    return productKeys.filter((key) => !(key in obj));
  }
}
