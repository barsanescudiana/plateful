import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {
}

ngOnInit(): void {
    // @ts-ignore
  google.accounts.id.initialize({
    client_id: "YOUR GOOGLE CLIENT ID",
    callback: this.handleCredentialResponse.bind(this),
    auto_select: false,
    cancel_on_tap_outside: true,

  });
  // @ts-ignore
  google.accounts.id.renderButton(
  // @ts-ignore
  document.getElementById("google-button"),
    { theme: "outline", size: "large", width: "100%" }
  );
  // @ts-ignore
  google.accounts.id.prompt((notification: PromptMomentNotification) => {});


}

async handleCredentialResponse(response: any) {
  // Here will be your response from Google.
  console.log(response);
}
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['dashboard']));
  }
}
