import { Component, Input } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { PantryService } from "../pantry/services/pantry.service";
import { User } from "src/app/interfaces/user.interface";
import { FormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { NutritionalValues } from "src/app/interfaces/nutritional-values.interface";
import { Router } from "@angular/router";
import * as moment from "moment";

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
  @Input() withTitle: boolean = true;
  @Input() productFromScan: Partial<Product> | any;
  public validForm: boolean = true;
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

    if (this.productFromScan) {
      this.product = this.productFromScan;
      this.initFormControlValues(this.productFromScan);
      this.validForm = this.checkFormIsValid();
    }
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      if (this.productFromScan?.nutritionalValues) {
        this.product.nutritionalValues = this.productFromScan.nutritionalValues;
      }

      let productToAdd: Product = this.product;
      productToAdd.isClaimed = false;
      productToAdd.isShared = false;
      productToAdd.dateAdded = new Date();

      this.pantryService
        .addProduct(productToAdd)
        .subscribe((result: { message: string }) => {
          if (result.message === "Added") {
            this.router.navigateByUrl("/pantry");
          }
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public initFormControlValues(product: Product) {
    this.formGroup.get("name")?.setValue(product.name);
    if (product.quantity) {
      this.formGroup
        .get("quantity")
        ?.setValue(parseInt(product.quantity.toString()));
    }

    if (product.expirationDate) {
      this.formGroup
        .get("date")
        ?.setValue(
          moment(new Date(product.expirationDate)).format("yyyy-MM-DD")
        );
    }

    if (product.measurement) {
      const measurement = this.measurementUnits.find(
        (item) => item.short === product.measurement
      );
      if (measurement) {
        this.formGroup.get("measurement")?.setValue(measurement.short);
      }
    }

    if (product.category) {
      this.formGroup.get("category")?.setValue(product.category);
    }

    if (product.storage) {
      this.formGroup.get("storage")?.setValue(product.storage);
    }

    if (product.nutritionalValues) {
      this.formGroup
        .get("calories")
        ?.setValue(product.nutritionalValues.calories);
      this.formGroup.get("fats")?.setValue(product.nutritionalValues.fats);
      this.formGroup
        .get("proteins")
        ?.setValue(product.nutritionalValues.proteins);
      this.formGroup.get("carbs")?.setValue(product.nutritionalValues.carbs);
    }
  }

  public checkFormIsValid() {
    return (
      this.formGroup.invalid && (this.formGroup.dirty || this.formGroup.touched)
    );
  }

  get measurementControl() {
    return this.formGroup.get("measurement");
  }

  public checkControlIsInvalid(control: string) {
    return (
      this.formGroup.get(control)?.invalid &&
      (this.formGroup.get(control)?.dirty ||
        this.formGroup.get(control)?.touched)
    );
  }
}
