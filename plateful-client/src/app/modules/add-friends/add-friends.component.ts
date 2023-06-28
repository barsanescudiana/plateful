import { Component, OnInit } from '@angular/core';
import { AddFriendsService } from './services/add-friends.service';
import { UserEmail, UserSuggestion } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {

  public suggestions: UserSuggestion[] = [];
  public allUsers: UserEmail[] = [];
  public searchResult: UserEmail[] = [];

  public filters: string[] = ["Filter", "Sort"];
  public selectedFilter: string = "";
  public hasBeenFocusedBefore: boolean = false;

  constructor(private addFriendsService: AddFriendsService, private router: Router) {}

  ngOnInit(): void {
      this.addFriendsService.getSuggestions()
        .subscribe(res => this.suggestions = res.suggestions);
  }

  public handleFilterSelection(filter: string) {
    if (this.selectedFilter === filter) {
      this.selectedFilter = "";
    } else {
      this.selectedFilter = filter;
    }
  }

  public onInputFocused() {
    if (!this.hasBeenFocusedBefore) {
      this.addFriendsService.getAllUsers()
        .subscribe(res => this.allUsers = res.allUsers);

      this.hasBeenFocusedBefore = true;
    }
  }

  public onInput(e: any) {
    if (e.target.value) {
      this.searchResult = this.allUsers
        .filter(u => u.email.value.includes(e.target.value));
    }
  }

  public isSearchResultsEmpty() {
    return this.searchResult.length === 0;
  }

  public onResultClick(userId: string) {
    this.router.navigateByUrl(`/profile/${userId}`);
  }
}
