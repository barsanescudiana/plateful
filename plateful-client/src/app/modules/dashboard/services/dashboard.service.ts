import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private path = 'http://localhost:3000/api/user/settings/me';

  public updateMyNotificationSettings(value: PushSubscription | null): Observable<{}> {
    return this.http.patch(this.path, { pushSubscription: value }) as Observable<{}>;
  }
}
