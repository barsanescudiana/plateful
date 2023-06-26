import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Emojis } from "src/app/enums/emojis.enum";
import { Product } from "src/app/interfaces/product.interface";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | any;
  public formattedDate: string = "";

  constructor(private datePipe: DatePipe, private router: Router) {}

  ngOnInit(): void {
    if (
      (new Date().getTime() - new Date(this.product.expirationDate).getTime()) /
        (1000 * 3600 * 24) <
      0
    ) {
      this.formattedDate = moment(this.product.expirationDate).format(
        "DD.MM.yyyy"
      );
    } else if (
      new Date(this.product.expirationDate).getTime() < new Date().getTime()
    ) {
      this.formattedDate = `Expired ${
        (new Date().getTime() -
          new Date(this.product.expirationDate).getTime()) /
        (1000 * 3600 * 24)
      } days ago!`;
    } else {
      if (
        (new Date().getTime() -
          new Date(this.product.expirationDate).getTime()) /
          (1000 * 3600 * 24) >
        1
      ) {
        this.formattedDate = `Expiring in ${
          (new Date().getTime() -
            new Date(this.product.expirationDate).getTime()) /
          (1000 * 3600 * 24)
        } days!`;
      } else {
        if (
          (new Date().getTime() -
            new Date(this.product.expirationDate).getTime()) /
            (1000 * 3600 * 24) ===
          0
        ) {
          this.formattedDate = `Expiring today!`;
        } else {
          this.formattedDate = `Expiring in ${
            (new Date().getTime() -
              new Date(this.product.expirationDate).getTime()) /
            (1000 * 3600 * 24)
          } day!`;
        }
      }
    }
  }

  public handleProductClick(): void {
    this.router.navigate([`/product/${this.product.id}`]);
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
}
