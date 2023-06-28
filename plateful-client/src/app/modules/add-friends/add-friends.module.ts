import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendsComponent } from './add-friends.component';
import { SharedModule } from "src/app/components/shared.module";
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [
    AddFriendsComponent,
    SuggestionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
  ],
  exports: [AddFriendsComponent],
})
export class AddFriendsModule { }
