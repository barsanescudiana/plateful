import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { NotificationsComponent } from "./notifications.component";
import { SharedModule } from "src/app/components/shared.module";
import { NotificationCardComponent } from "./components/notification-card/notification-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
  ],
  exports: [NotificationsComponent],
  providers: [DatePipe],
})
export class NotificationsModule {}
