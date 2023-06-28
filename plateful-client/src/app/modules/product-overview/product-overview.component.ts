import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { PantryService } from "../pantry/services/pantry.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/interfaces/user.interface";
import { Emojis } from "src/app/enums/emojis.enum";
import { RecipesService } from "../recipes/services/recipes.service";
import { Recipe } from "src/app/interfaces/recipe.interface";
import { MatDialog } from "@angular/material/dialog";
import { ShareProductDialogComponent } from "./components/share-product-dialog/share-product-dialog.component";
import { BasicDialogComponentComponent } from "src/app/components/basic-dialog-component/basic-dialog-component.component";

@Component({
  selector: "app-product-overview",
  templateUrl: "./product-overview.component.html",
  styleUrls: ["./product-overview.component.scss"],
})
export class ProductOverviewComponent implements OnInit {
  public product: Product = {};
  private user: User | undefined;
  public expirationInfo:
    | {
        text: string;
        days: number;
        good: boolean;
        expired: boolean;
        expiring: boolean;
      }
    | any;
  public suggestedRecipes: Recipe[] | any;
  private color: string = "";

  constructor(
    private pantryService: PantryService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
    this.pantryService
      .getProductById(
        this.activateRoute.snapshot.params["productId"],
        this.user!.id
      )
      .subscribe((data) => {
        this.product = data;
        this.expirationInfo = this.checkExpirationDateValidity();
        if (!this.expirationInfo.expired) {
        }
        this.recipesService
          .getRecipesByIngredients(this.user!.id, this.product.name!)
          .subscribe((data) => {
            this.suggestedRecipes = data;
          });
      });
  }

  public checkProductNutritionalValues(): boolean {
    if (
      this.product.nutritionalValues?.calories &&
      this.product.nutritionalValues.carbs &&
      this.product.nutritionalValues.fats &&
      this.product.nutritionalValues.proteins
    ) {
      return true;
    }

    return false;
  }

  public getExpirationText(): string {
    return "Expiring";
  }

  public getDaysInPantry(): number {
    return Math.round(
      (new Date().getTime() - new Date(this.product.dateAdded!).getTime()) /
        (1000 * 3600 * 24)
    );
  }

  public checkExpirationDateValidity(): {
    text: string;
    days: number;
    good: boolean;
    expired: boolean;
    expiring: boolean;
  } {
    if (
      new Date(this.product.expirationDate!).getTime() - new Date().getTime() <
      0
    ) {
      this.color = "#EF5DA8";

      return {
        text: "Expired",
        days: Math.round(
          (new Date().getTime() -
            new Date(this.product.expirationDate!).getTime()) /
            (1000 * 3600 * 24)
        ),
        good: false,
        expired: true,
        expiring: false,
      };
    }
    if (
      (new Date(this.product.expirationDate!).getTime() -
        new Date().getTime()) /
        (1000 * 3600 * 24) >
      5
    ) {
      this.color = "#46D5B3";
      return {
        text: "Expiring",
        days: Math.round(
          (new Date(this.product.expirationDate!).getTime() -
            new Date().getTime()) /
            (1000 * 3600 * 24)
        ),
        good: true,
        expired: false,
        expiring: false,
      };
    } else {
      this.color = "#FCB938";
      return {
        text: "Expiring",
        days: Math.round(
          (new Date(this.product.expirationDate!).getTime() -
            new Date().getTime()) /
            (1000 * 3600 * 24)
        ),

        good: false,
        expired: false,
        expiring: true,
      };
    }
  }

  public getProductEmoji(): string {
    let productEmoji = "";
    if (Emojis.get(this.product.name!.toLowerCase())) {
      return Emojis.get(this.product.name!.toLowerCase())!;
    }
    Emojis.forEach((emoji, key) => {
      if (this.product.name?.toLowerCase().includes(key)) {
        productEmoji = emoji;
      }
    });

    if (productEmoji) {
      return productEmoji;
    } else {
      return Emojis.get(this.product.category!.toLowerCase())!;
    }
  }

  public shareProduct() {
    const dialogRef = this.dialog.open(ShareProductDialogComponent, {
      data: {
        title: "Share product",
        options: {
          payload: {
            product: this.product,
            color: this.color,
          },
        },
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === "Shared") {
        await this.pantryService
          .shareProduct(this.product.id!)
          .subscribe((data) => {
            this.product = data;
          });

        const dialogRef = this.dialog.open(BasicDialogComponentComponent, {
          data: {
            title: "Congrats!",
            options: {
              payload: {
                productName: this.product.name,
                color: this.color,
                hintText: this.expirationInfo.good
                  ? this.expirationInfo.text +
                    " over " +
                    this.expirationInfo.days +
                    " days!"
                  : this.expirationInfo.text +
                    " " +
                    this.expirationInfo.days +
                    " days!",
              },
            },
          },
        });

        dialogRef.afterClosed().subscribe(async (result) => {
          if (result === "Completed") {
            await this.pantryService
              .getProductById(this.product.id!, this.user!.id)
              .subscribe((data) => {
                this.product = data;
                this.cd.detectChanges();
              });
          }
        });
      }
    });
  }

  public deleteProduct() {
    console.log("Delete");
  }

  public redirectToRecipes() {
    this.router.navigateByUrl("/recipes");
  }
}
