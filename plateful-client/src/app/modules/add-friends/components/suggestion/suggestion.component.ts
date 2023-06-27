import { Component, Input } from '@angular/core';
import { UserSuggestion } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  @Input() user: UserSuggestion | any;
}
