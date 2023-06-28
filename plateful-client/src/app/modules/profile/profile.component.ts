import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "./services/profile.service";
import { User } from "src/app/interfaces/user.interface";
import { Product } from "src/app/interfaces/product.interface";
import { FriendshipStatus } from "src/app/enums/friendship-status.enum";

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
  public friendship: FriendshipStatus = FriendshipStatus.NOT_FRIENDS;
  public disableBtn: boolean = false;
  public shareClicked: boolean = false;

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

        this.friendship = this.getFriendshipStatus();
      });
    console.log(this.route.snapshot.params);
  }

  private getFriendshipStatus(): FriendshipStatus {
    const myId = JSON.parse(localStorage.getItem('USER_DATA')!).id;

    // friends already
    if(this.user.friends.includes(myId)) {
      this.disableBtn = true;
      return FriendshipStatus.FRIENDS;
    }

    // request sent
    if(this.user.notifications.find((n: any) => n.detail.requestor === myId)) {
      this.disableBtn = true;
      return FriendshipStatus.REQUEST_SENT;
    }

    // not one or the other
    return FriendshipStatus.NOT_FRIENDS;
  }

  public areFriends() {
    return this.friendship === FriendshipStatus.FRIENDS;
  }

  public areNotFriends() {
    return this.friendship === FriendshipStatus.NOT_FRIENDS;
  }

  public isFriendRequestSent() {
    return this.friendship === FriendshipStatus.REQUEST_SENT;
  }

  public handleSendClick(): void {
    this.profileService.sendFriendRequest(this.route.snapshot.params["userId"])
      .subscribe(res => {
        if (res.id) {
          this.disableBtn = true;
        }
      });
  }

  public toggleUpdateArea(): void {
    this.isUpdateAreaVisible = !this.isUpdateAreaVisible;
  }

  public updateDetails(): void {
    console.log("Update details");
  }

  public copyProfileLink(): void {
    navigator.clipboard.writeText(window.location.toString());
    this.shareClicked = true;
    setTimeout(() => {
      this.shareClicked = false;
    }, 1000);
  }
}
