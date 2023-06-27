import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSuggestion } from 'src/app/interfaces/user.interface';

interface SuggestionsResponse {
  suggestions: UserSuggestion[];
}

@Injectable({
  providedIn: 'root'
})
export class AddFriendsService {
  private path = "http://localhost:3000/api/friends/suggestions";

  constructor(private http: HttpClient) { }

  public getSuggestions(): Observable<SuggestionsResponse> {
    return this.http.get(this.path) as Observable<SuggestionsResponse>;
  }
}
