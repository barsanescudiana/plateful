import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';
import { PantryComponent } from './modules/pantry/pantry.component';
import { RecipesComponent } from './modules/recipes/recipes.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { FriendsPantryComponent } from './modules/friends-pantry/friends-pantry.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PantryModule } from './modules/pantry/pantry.module';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    FriendsPantryComponent,
    ShoppingListComponent,
    UserIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PantryModule,
    DashboardModule,
    SharedModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('987698742806-sm0bm2pr9rquctpfeuvfkh896gaccaeg.apps.googleusercontent.com')
        }
      ]
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
