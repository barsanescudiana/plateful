import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-pantry',
  templateUrl: './friends-pantry.component.html',
  styleUrls: ['./friends-pantry.component.scss']
})
export class FriendsPantryComponent {

  constructor(private router: Router) {}

  public onAddClicked() {
    this.router.navigateByUrl('/add-friends');
  }
}
