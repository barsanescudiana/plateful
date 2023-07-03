import { Component, Input } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { FriendsPantryService } from "../../services/friends-pantry.service";
import { User } from "src/app/interfaces/user.interface";
import { ShareProductDialogComponent } from "src/app/modules/product-overview/components/share-product-dialog/share-product-dialog.component";
import { BasicDialogComponentComponent } from "src/app/components/basic-dialog-component/basic-dialog-component.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-friends-product-card",
  templateUrl: "./friends-product-card.component.html",
  styleUrls: ["./friends-product-card.component.scss"],
})
export class FriendsProductCardComponent {
  @Input() product: {
    product: Product | any;
    user: User | any;
  };

  public color: string = "";

  constructor(
    private friendsService: FriendsPantryService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  public handleProductClaim(): void {
    const dialogRef = this.dialog.open(ShareProductDialogComponent, {
      data: {
        title: "Claim product",
        options: {
          type: "claim",
          payload: {
            product: this.product.product,
            color: this.color,
          },
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "Claimed") {
        this.friendsService
          .claimProduct(this.product.user.id, this.product.product.id)
          .subscribe();
        const dialogRef = this.dialog.open(BasicDialogComponentComponent, {
          data: {
            title: "Congrats!",
            options: {
              type: "claim",
              payload: {
                productName: this.product.product.name,
                color: this.color,
              },
            },
          },
        });

        dialogRef.afterClosed().subscribe(async (result) => {
          if (result === "Completed") {
            const currentUrl = this.router.url;
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          }
        });
      }
    });
  }

  public handleProductClick() {
    console.log("click");
  }

  public checkExpirationDateValidity(): {
    text: string;
    days: number;
    good: boolean;
    expired: boolean;
    expiring: boolean;
  } {
    if (
      new Date(this.product.product.expirationDate!).getTime() -
        new Date().getTime() <
      0
    ) {
      this.color = "#EF5DA8";

      return {
        text: "Expired",
        days: Math.round(
          (new Date().getTime() -
            new Date(this.product.product.expirationDate!).getTime()) /
            (1000 * 3600 * 24)
        ),
        good: false,
        expired: true,
        expiring: false,
      };
    }
    if (
      (new Date(this.product.product.expirationDate!).getTime() -
        new Date().getTime()) /
        (1000 * 3600 * 24) >
      5
    ) {
      this.color = "#46D5B3";
      return {
        text: "Expiring",
        days: Math.round(
          (new Date(this.product.product.expirationDate!).getTime() -
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
          (new Date(this.product.product.expirationDate!).getTime() -
            new Date().getTime()) /
            (1000 * 3600 * 24)
        ),

        good: false,
        expired: false,
        expiring: true,
      };
    }
  }
}
