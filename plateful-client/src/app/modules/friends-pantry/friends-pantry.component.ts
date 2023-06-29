import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/interfaces/product.interface";
import { User } from "src/app/interfaces/user.interface";
import { FriendsPantryService } from "./services/friends-pantry.service";

@Component({
  selector: "app-friends-pantry",
  templateUrl: "./friends-pantry.component.html",
  styleUrls: ["./friends-pantry.component.scss"],
})
export class FriendsPantryComponent implements OnInit {
  public user: User | any;
  public filters: string[] = ["Filter", "Sort"];
  public selectedFilter: string = "";

  public products: {
    product: Product;
    user: User | any;
  }[] = [];

  public searchValue: string = "";
  public noDataText: string = "";

  private allProducts: {
    product: Product;
    user: User | any;
  }[] = [];

  constructor(
    private router: Router,
    private friendsService: FriendsPantryService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
    this.noDataText = this.getNoDataText();

    this.friendsService.getFriendsProducts().subscribe((products: any) => {
      if (products && products.sharedProductsOfFriends) {
        this.products = products.sharedProductsOfFriends;
        this.allProducts = products.sharedProductsOfFriends;
      }
    });
  }

  public filterArray() {
    this.products = this.allProducts.filter((item) => {
      return item.product.name
        ?.toLowerCase()
        .includes(this.searchValue.toLowerCase());
    });

    if (!this.products.length) {
      this.noDataText =
        "There are no products found matching " + this.searchValue + ".";
    }
  }

  public handleFilterSelection(filter: string) {
    if (this.selectedFilter === filter) {
      this.selectedFilter = "";
    } else {
      this.selectedFilter = filter;
    }
  }

  public onAddClicked() {
    this.router.navigateByUrl("/add-friends");
  }

  public getNoDataText(): string {
    if (this.user && this.user.friends.length) {
      return "There are no products shared by your friends!";
    }

    return "You do not have any friends yet!";
  }
}
