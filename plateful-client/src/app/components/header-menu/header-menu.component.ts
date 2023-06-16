import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  constructor(
    private router: Router
  ) {

  }
public onSettingsClick(): void {
throw new Error('Method not implemented.');
}
public onNotificationClick(): void {
throw new Error('Method not implemented.');
}
public onHomeClick(): void {
this.router.navigateByUrl('/dashboard');
}

  @Input() public withHomepageButton: boolean = false;
}
