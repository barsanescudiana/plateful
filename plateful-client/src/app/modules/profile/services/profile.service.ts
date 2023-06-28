import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private path = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  public getUserById(userId: string): User | any {
    return this.http.get(`${this.path}user/`, {
      params: {
        userId: userId,
      },
    });
  }
}
