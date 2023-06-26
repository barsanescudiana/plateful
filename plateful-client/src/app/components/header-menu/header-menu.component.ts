import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
})
export class HeaderMenuComponent {
  constructor(private router: Router) {}
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

  @Input() public withHomepageButton: boolean = false;
}
