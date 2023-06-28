import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/interfaces/settings.interface';

interface SettingsResponse {
  settings: Settings;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) { }

  private path = 'http://localhost:3000/api/user/settings/me';

  public getMySettings(): Observable<SettingsResponse> {
    return this.http.get(this.path) as Observable<SettingsResponse>;
  }
}
