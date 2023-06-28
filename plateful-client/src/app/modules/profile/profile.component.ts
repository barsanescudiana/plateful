import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "./services/profile.service";
import { User } from "src/app/interfaces/user.interface";
import { Product } from "src/app/interfaces/product.interface";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: User | any;
  public canEdit: boolean = false;
  public allProductsCount: number = 0;
  public sharedProductsCount: number = 0;

  public isUpdateAreaVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getUserById(this.route.snapshot.params["userId"])
      .subscribe((data: User) => {
        this.user = data;

        this.allProductsCount = data.products.length;
        this.sharedProductsCount = data.products.filter((product: Product) => {
          return product.isShared;
        }).length;
        if (
          data.email === JSON.parse(localStorage.getItem("USER_DATA")!).email
        ) {
          this.canEdit = true;
        }
      });
    console.log(this.route.snapshot.params);
  }

  public handleSendClick(): void {
    console.log("Send");
  }

  public toggleUpdateArea(): void {
    this.isUpdateAreaVisible = !this.isUpdateAreaVisible;
  }

  public updateDetails(): void {
    console.log("Update details");
  }

  public copyProfileLink(): void {
    console.log("Copy profile link");
  }
}
