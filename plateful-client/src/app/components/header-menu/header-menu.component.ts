import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationsService } from "src/app/modules/notifications/services/notifications.service";

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
})
export class HeaderMenuComponent implements OnInit {
  @Input() public withHomepageButton: boolean = false;
  public hasNotifications = false;

  constructor(
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.notificationsService.getMyNotifications().subscribe((data) => {
      if (data.notifications?.length) {
        this.hasNotifications = true;
      }
    });
  }
  public onSettingsClick(): void {
    this.router.navigateByUrl("/settings");
  }
  public onNotificationClick(): void {
    this.router.navigateByUrl("/notifications");
  }
  public onHomeClick(): void {
    this.router.navigateByUrl("/dashboard");
  }

  public onUserIconClick(): void {
    this.router.navigateByUrl("/profile");
  }
}
