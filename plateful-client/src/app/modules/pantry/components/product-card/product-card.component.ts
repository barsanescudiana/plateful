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
  @Input() border: any;
  @Input() margin: boolean = true;
  @Input() withPill: boolean = true;
  public color: string = "";
  public formattedDate: string = "";

  constructor(private datePipe: DatePipe, private router: Router) {}

  ngOnInit(): void {
    if (
      Math.round(
        (new Date(this.product.expirationDate).getTime() -
          new Date().getTime()) /
          (1000 * 3600 * 24)
      ) > 5
    ) {
      this.color = "#46D5B3";
      this.formattedDate = moment(this.product.expirationDate).format(
        "DD.MM.yyyy"
      );
    } else if (
      new Date(this.product.expirationDate).getTime() < new Date().getTime()
    ) {
      this.color = "#EF5DA8";
      this.formattedDate = `Expired ${Math.round(
        (new Date().getTime() -
          new Date(this.product.expirationDate).getTime()) /
          (1000 * 3600 * 24)
      )} days ago!`;
    } else {
      if (
        Math.round(
          (new Date(this.product.expirationDate).getTime() -
            new Date().getTime()) /
            (1000 * 3600 * 24)
        ) > 1
      ) {
        this.color = "#FCB938";
        this.formattedDate = `Expiring in ${Math.round(
          (new Date(this.product.expirationDate).getTime() -
            new Date().getTime()) /
            (1000 * 3600 * 24)
        )} days!`;
      } else {
        if (
          Math.round(
            (new Date().getTime() -
              new Date(this.product.expirationDate).getTime()) /
              (1000 * 3600 * 24)
          ) === 0
        ) {
          this.color = "#FCB938";
          this.formattedDate = `Expiring today!`;
        } else {
          this.color = "#FCB938";
          this.formattedDate = `Expiring in ${Math.round(
            (new Date(this.product.expirationDate).getTime() -
              new Date().getTime()) /
              (1000 * 3600 * 24)
          )} day!`;
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
