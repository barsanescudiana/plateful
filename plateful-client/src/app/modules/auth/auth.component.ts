import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { AuthService } from "./services/auth.service";
import { CredentialResponse, PromptMomentNotification } from "google-one-tap";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("USER_DATA")) {
      localStorage.removeItem("USER_DATA");
      localStorage.removeItem("Tokens.AccessToken");
    }
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          "987698742806-sm0bm2pr9rquctpfeuvfkh896gaccaeg.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("google"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  public async handleCredentialResponse(response: CredentialResponse) {
    await this.authService.loginWithGoogle(response.credential).subscribe(
      (data: any) => {
        if (data.status !== 500) {
          localStorage.setItem("USER_DATA", JSON.stringify(data.user));
          localStorage.setItem("Tokens.AccessToken", data.token);
          this._ngZone.run(() => {
            this.router.navigate(["/dashboard"]);
          });
        } else {
          console.log("Login unsuccessful");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // loginWithGoogle(): void {
  //   this.socialAuthService
  //     .signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(() => this.router.navigate(["dashboard"]));
  // }
}
