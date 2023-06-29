import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class FriendsPantryService {
  private path = "http://localhost:3000/api/friends/";

  constructor(private http: HttpClient) {}

  public getFriendsProducts(): Observable<{
    sharedProductsOfFriends: Product[];
  }> {
    return this.http.get(`${this.path}products`) as Observable<{
      sharedProductsOfFriends: Product[];
    }>;
  }
}
