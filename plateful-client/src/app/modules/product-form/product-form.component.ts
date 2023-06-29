import { Component } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { PantryService } from "../pantry/services/pantry.service";
import { User } from "src/app/interfaces/user.interface";
import { FormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { NutritionalValues } from "src/app/interfaces/nutritional-values.interface";
import { Router } from "@angular/router";

interface MeasurementUnit {
  name: string;
  short: string;
}

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent {
  public formGroup: FormGroup = new FormGroup({});
  public product: Product = {
    nutritionalValues: {
      calories: 0,
      fats: 0,
      carbs: 0,
      proteins: 0,
    },
  };
  public measurementUnits: MeasurementUnit[] = [
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

  public storageOptions: string[] = ["Fridge", "Freezer", "Dry pantry"];
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
  private user: User | undefined;

  constructor(private pantryService: PantryService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);

    this.formGroup.addControl(
      "name",
      new UntypedFormControl("", {
        validators: Validators.required,
      })
    );
    this.formGroup.addControl(
      "date",
      new UntypedFormControl("", {
        validators: Validators.required,
      })
    );
    this.formGroup.addControl(
      "quantity",
      new UntypedFormControl("", {
        validators: Validators.required,
      })
    );
    this.formGroup.addControl(
      "measurement",
      new UntypedFormControl("", {
        validators: Validators.required,
      })
    );
    this.formGroup.addControl(
      "storage",
      new UntypedFormControl("", {
        validators: Validators.required,
      })
    );
    this.formGroup.addControl(
      "category",
      new UntypedFormControl("", {
        validators: Validators.required,
      })
    );
    this.formGroup.addControl("calories", new UntypedFormControl(""));
    this.formGroup.addControl("carbs", new UntypedFormControl(""));
    this.formGroup.addControl("proteins", new UntypedFormControl(""));
    this.formGroup.addControl("fats", new UntypedFormControl(""));

    this.formGroup.valueChanges.subscribe((data) => {
      let nutritionalValues: NutritionalValues | undefined =
        data.calories && data.carbs && data.fats && data.proteins
          ? {
              calories: data.calories,
              carbs: data.carbs,
              fats: data.fats,
              proteins: data.proteins,
            }
          : undefined;

      this.product = {
        name: data.name || "",
        expirationDate: data.date || "",
        quantity: data.quantity || 0,
        measurement: data.measurement || "",
        storage: data.storage,
        category: data.category,
      };

      if (nutritionalValues) {
        this.product.nutritionalValues = nutritionalValues;
      }
    });
  }

  public onSubmit(): void {
    const productToAdd: Product = this.product;
    productToAdd.isClaimed = false;
    productToAdd.isShared = false;
    productToAdd.dateAdded = new Date();
    if (this.user && this.formGroup.valid) {
      this.pantryService
        .addProduct(this.user.id, productToAdd)
        .subscribe((result: { message: string }) => {
          if (result.message === "Added") {
            this.router.navigateByUrl("/pantry");
          }
        });
    }
  }
}
