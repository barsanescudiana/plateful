import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/interfaces/notification.interface';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications: Notification<any>[] = [];

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
      this.notificationsService.getMyNotifications()
        .subscribe(res => this.notifications = res.notifications);
  }
}
