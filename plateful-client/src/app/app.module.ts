import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthModule } from "./modules/auth/auth.module";
import { ShoppingListModule } from "./modules/shopping-list/shopping-list.module";
import { ProductFormComponent } from "./modules/product-form/product-form.component";
import { SettingsComponent } from "./modules/settings/settings.component";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { ScanBarcodeComponent } from "./modules/scan-barcode/scan-barcode.component";
import { ProfileComponent } from "./modules/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ProductOverviewComponent } from "./modules/product-overview/product-overview.component";
import { NgxBarcodeScannerModule } from "@eisberg-labs/ngx-barcode-scanner";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { AccessTokenInterceptor } from "./http-interceptors/accessToken.interceptor";
import { NotificationCardComponent } from "./modules/notifications/components/notification-card/notification-card.component";
import { AddFriendsModule } from "./modules/add-friends/add-friends.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { ShareProductDialogComponent } from "./modules/product-overview/components/share-product-dialog/share-product-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FriendsPantryModule } from "./modules/friends-pantry/friends-pantry.module";

@NgModule({
  declarations: [
    AppComponent,
    UserIconComponent,
    ProductFormComponent,
    ScanBarcodeComponent,
    ProfileComponent,
    ProductOverviewComponent,
    ShareProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PantryModule,
    NotificationsModule,
    SettingsModule,
    AddFriendsModule,
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
    MatDialogModule,
    FriendsPantryModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
