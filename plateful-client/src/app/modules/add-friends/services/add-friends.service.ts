import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSuggestion, UserEmail } from 'src/app/interfaces/user.interface';

interface SuggestionsResponse {
  suggestions: UserSuggestion[];
}

interface AllUsersResponse {
  allUsers: UserEmail[];
}

@Injectable({
  providedIn: 'root'
})
export class AddFriendsService {
  private suggestionsPath = "http://localhost:3000/api/friends/suggestions";
  private allUsersPath = "http://localhost:3000/api/friends/all-users";

  constructor(private http: HttpClient) { }

  public getSuggestions(): Observable<SuggestionsResponse> {
    return this.http.get(this.suggestionsPath) as Observable<SuggestionsResponse>;
  }

  public getAllUsers(): Observable<AllUsersResponse> {
    return this.http.get(this.allUsersPath) as Observable<AllUsersResponse>;
  }
}
