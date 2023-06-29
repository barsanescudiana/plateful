import { Component, Input } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";

@Component({
  selector: "app-friends-product-card",
  templateUrl: "./friends-product-card.component.html",
  styleUrls: ["./friends-product-card.component.scss"],
})
export class FriendsProductCardComponent {
  @Input() product: Product | any;

  public handleProductClaim(): void {
    console.log("handle claim");
  }
}
