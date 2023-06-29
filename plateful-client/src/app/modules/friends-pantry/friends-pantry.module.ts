import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendsPantryComponent } from "./friends-pantry.component";
import { SharedModule } from "src/app/components/shared.module";
import { FormsModule } from "@angular/forms";
import { PantryModule } from "../pantry/pantry.module";
import { FriendsProductCardComponent } from './components/friends-product-card/friends-product-card.component';

@NgModule({
  declarations: [FriendsPantryComponent, FriendsProductCardComponent],
  imports: [CommonModule, SharedModule, FormsModule, PantryModule],
})
export class FriendsPantryModule {}
