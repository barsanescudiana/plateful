import { Component } from '@angular/core';

@Component({
  selector: 'app-pantry-menu',
  templateUrl: './pantry-menu.component.html',
  styleUrls: ['./pantry-menu.component.scss']
})
export class PantryMenuComponent {

  public storageOptions: string[] = ['All', 'Fridge', 'Freezer', 'Pantry']
  public selectedOption: string = 'All'

  public handleOptionClick(option: string): void {
    this.selectedOption = option;
  }
}
