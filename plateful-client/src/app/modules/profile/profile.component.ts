import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "./services/profile.service";
import { User, UserPublicInfo } from "src/app/interfaces/user.interface";
import { Product } from "src/app/interfaces/product.interface";
import { FriendshipStatus } from "src/app/enums/friendship-status.enum";
import { Friend } from "src/app/interfaces/friend.interface";

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
  public friendsInfo: UserPublicInfo[] | any = [];

  public isUpdateAreaVisible: boolean = false;
  public friendship: FriendshipStatus = FriendshipStatus.NOT_FRIENDS;
  public disableBtn: boolean = false;
  public shareClicked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
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

        this.profileService.getFriends().subscribe((data) => {
          if (data.length) {
            data.forEach((friendId: string) => {
              this.profileService
                .getUserById(friendId)
                .subscribe((data: User) => {
                  this.friendsInfo.push({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    id: friendId,
                    picture: data.picture,
                  });
                  console.log(this.friendsInfo);
                });
            });
          }
        });
      });
  }

  private getFriendshipStatus(): FriendshipStatus {
    const myId = JSON.parse(localStorage.getItem("USER_DATA")!).id;

    // friends already
    if (this.user.friends.includes(myId)) {
      this.disableBtn = true;
      return FriendshipStatus.FRIENDS;
    }

    // request sent
    if (this.user.notifications.find((n: any) => n.detail.requestor === myId)) {
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
    this.profileService
      .sendFriendRequest(this.route.snapshot.params["userId"])
      .subscribe((res) => {
        if (res.id) {
          this.disableBtn = true;
        }
      });
  }

  public toggleUpdateArea(): void {
    this.isUpdateAreaVisible = !this.isUpdateAreaVisible;
  }

  public updateDetails(): void {
    this.profileService
      .updateProfileDetails({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
      })
      .subscribe((data) => {
        this.user = data;
        this.isUpdateAreaVisible = false;
      });
  }

  public copyProfileLink(): void {
    navigator.clipboard.writeText(window.location.toString());
    this.shareClicked = true;
    setTimeout(() => {
      this.shareClicked = false;
    }, 1000);
  }
}
