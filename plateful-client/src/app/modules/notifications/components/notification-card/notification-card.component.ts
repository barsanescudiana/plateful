import { Component, Input,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enums/notification-types.enum';
import { Notification } from 'src/app/interfaces/notification.interface';
import { NotificationsService } from '../../services/notifications.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
  @Input() notification: Notification<any> | any;
  public time: string = "";
  public accepted: boolean = false;
  public deleted: boolean = false;

  constructor(private router: Router, private notificationsService: NotificationsService) {}

  ngOnInit(): void {
      // @ts-ignore
      const difference = new Date() - new Date(this.notification.date);
      const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      this.time = formatter.format(Math.round(difference / 86400000), 'day');
  }

  public isFriendRequest() {
    return this.notification.type === NotificationType.FRIEND_REQUEST;
  }

  public isExpiry() {
    return this.notification.type === NotificationType.EXPIRY;
  }

  public isGeneric() {
    return this.notification.type === NotificationType.GENERIC;
  }

  public onAccept() {
    this.notificationsService.acceptFriendRequest(this.notification.id)
      .subscribe((res) => {
        if (res.status === 201) {
          this.accepted = true;
        }
      });
  }

  public onDecline() {
    this.notificationsService.deleteNotification(this.notification.id)
      .subscribe((res) => {
        if (res.status === 200) {
          this.deleted = true;
        }
      })
  }

  public onClick() {
    // should go to profile of user
  }
}
