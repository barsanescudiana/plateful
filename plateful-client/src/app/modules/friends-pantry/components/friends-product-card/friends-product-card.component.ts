import { Component, Input } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { FriendsPantryService } from "../../services/friends-pantry.service";
import { User } from "src/app/interfaces/user.interface";

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

  constructor(private friendsService: FriendsPantryService) {}

  public handleProductClaim(): void {
    this.friendsService
      .claimProduct(this.product.user.id, this.product.product.id)
      .subscribe((data) => {
        console.log(data);
      });
    console.log(this.product);
  }

  public handleProductClick() {
    console.log("click");
  }
}
