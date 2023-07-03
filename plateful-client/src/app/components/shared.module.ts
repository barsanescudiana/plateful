import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderMenuComponent } from "./header-menu/header-menu.component";
import { MatButtonModule } from "@angular/material/button";
import { UserIconComponent } from "./user-icon/user-icon.component";
import { MobileMenuComponent } from "./mobile-menu/mobile-menu.component";
import { BasicDialogComponentComponent } from "./basic-dialog-component/basic-dialog-component.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderMenuComponent,
    MobileMenuComponent,
    BasicDialogComponentComponent,
  ],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [HeaderComponent, FooterComponent, HeaderMenuComponent],
})
export class SharedModule {}
