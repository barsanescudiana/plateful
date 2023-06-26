import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./modules/auth/auth.component";
import { PantryComponent } from "./modules/pantry/pantry.component";
import { RecipesComponent } from "./modules/recipes/recipes.component";
import { ShoppingListComponent } from "./modules/shopping-list/shopping-list.component";
import { FriendsPantryComponent } from "./modules/friends-pantry/friends-pantry.component";
import { UserIconComponent } from "./components/user-icon/user-icon.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./components/shared.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { PantryModule } from "./modules/pantry/pantry.module";
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthModule } from "./modules/auth/auth.module";
import { ShoppingListModule } from "./modules/shopping-list/shopping-list.module";
import { ProductFormComponent } from "./modules/product-form/product-form.component";
import { SettingsComponent } from "./modules/settings/settings.component";
import { NotificationsComponent } from "./modules/notifications/notifications.component";
import { ScanBarcodeComponent } from "./modules/scan-barcode/scan-barcode.component";
import { ProfileComponent } from "./modules/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ProductOverviewComponent } from "./modules/product-overview/product-overview.component";
import { NgxBarcodeScannerModule } from "@eisberg-labs/ngx-barcode-scanner";
import { RecipesModule } from "./modules/recipes/recipes.module";

@NgModule({
  declarations: [
    AppComponent,
    FriendsPantryComponent,
    UserIconComponent,
    ProductFormComponent,
    SettingsComponent,
    NotificationsComponent,
    ScanBarcodeComponent,
    ProfileComponent,
    ProductOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PantryModule,
    DashboardModule,
    ShoppingListModule,
    SharedModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    AuthModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    NgxBarcodeScannerModule,
    RecipesModule,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "987698742806-sm0bm2pr9rquctpfeuvfkh896gaccaeg.apps.googleusercontent.com"
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
