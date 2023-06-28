import { Component, OnInit } from '@angular/core';
import { AddFriendsService } from './services/add-friends.service';
import { UserSuggestion } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {

  public suggestions: UserSuggestion[] = [];
  public filters: string[] = ["Filter", "Sort"];
  public selectedFilter: string = "";

  constructor(private addFriendsService: AddFriendsService) {}

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
}
