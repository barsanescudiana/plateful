import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private path = "http://localhost:3000/api/";
  public redirectUrl: string = "";
  constructor(private client: HttpClient) {}

  public loginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set("Content-Type", "application/json");
    return this.client.post(
      `${this.path}auth/google`,
      { credentials: credentials },
      { headers: header }
    );
  }

  public getToken(): string | undefined {
    return localStorage.getItem("USER_DATA") ?? undefined;
  }
}
