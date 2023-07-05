import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FriendProduct } from "src/app/interfaces/product.interface";
import { User } from "src/app/interfaces/user.interface";
import { FriendsPantryService } from "./services/friends-pantry.service";
import { Storage } from "src/app/enums/storage.enum";

@Component({
  selector: "app-friends-pantry",
  templateUrl: "./friends-pantry.component.html",
  styleUrls: ["./friends-pantry.component.scss"],
})
export class FriendsPantryComponent implements OnInit {
  public user: User | any;
  public filters: string[] = ["Filter", "Sort"];
  public selectedFilter: string = "";
  public selectedMenuItem: string = "";

  public products: FriendProduct[] = [];
  public fridgeProducts: FriendProduct[] = [];
  public freezerProducts: FriendProduct[] = [];
  public dryProducts: FriendProduct[] = [];

  public searchValue: string = "";
  public noDataText: string = "";

  private allProducts: FriendProduct[] = [];

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

        this.products.forEach((product: FriendProduct) => {
          switch(product.product.storage) {
            case Storage.FRIDGE:
              this.fridgeProducts.push(product);
              break;
            case Storage.FREEZER:
              this.freezerProducts.push(product);
              break;
            case Storage.PANTRY:
              this.dryProducts.push(product);
              break;
          }
        });
      }
    });
  }

  public filterArray(arrayToFilter: string) {
    switch (arrayToFilter) {
      case Storage.FRIDGE:
        this.products = this.fridgeProducts.filter((item) => {
          return item.product.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
      case Storage.FREEZER:
        this.products = this.freezerProducts.filter((item) => {
          return item.product.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
      case Storage.PANTRY:
        this.products = this.dryProducts.filter((item) => {
          return item.product.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
      case "All":
        this.products = this.allProducts.filter((item) => {
          return item.product.name
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        break;
    }

    if (!this.products.length) {
      this.noDataText =
        "There are no products found matching " + this.searchValue + ".";
    }
  }

  public handleMenuChange(event: string): void {
    this.selectedMenuItem = event;
    switch(event) {
      case Storage.FRIDGE:
        this.products = this.fridgeProducts;
        break;
      case Storage.FREEZER:
        this.products = this.freezerProducts;
        break;
      case Storage.PANTRY:
        this.products = this.dryProducts;
        break;
      case "All":
        this.products = this.allProducts;
        break;
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
