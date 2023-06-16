import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { GoogleSigninButtonModule, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
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
})
export class AuthModule { }
