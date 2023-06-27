import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/interfaces/notification.interface';

interface NotificationsResponse {
  notifications: Notification<any>[];
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private path = "http://localhost:3000/api/notifications";
  private friendsPath = "http://localhost:3000/api/friends";
  constructor(private http: HttpClient) { }

  public getMyNotifications(): Observable<NotificationsResponse> {
    return this.http.get(this.path) as Observable<NotificationsResponse>;
  }

  public acceptFriendRequest(notificationId: string): Observable<any> {
    return this.http.patch(`${this.friendsPath}/accept?id=${notificationId}`, {}, { observe: 'response' }) as Observable<any>;
  }

  public deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete(`${this.path}/${notificationId}`, { observe: 'response' }) as Observable<any>;
  }
}
