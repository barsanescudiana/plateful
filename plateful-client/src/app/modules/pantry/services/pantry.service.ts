import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PantryService {
  private path = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  public getProductsForUser(userId: string): Observable<Product[]> {
    return this.http.get(`${this.path}user/products/all`, {
      params: {
        userId: userId,
      },
    }) as Observable<Product[]>;
  }

  public addProduct(product: Product): Observable<{ message: string }> {
    return this.http.patch(`${this.path}user/products/add`, {
      product: product,
    }) as Observable<{ message: string }>;
  }

  public deleteProduct(product: Product): Observable<{ message: string }> {
    return this.http.patch(`${this.path}user/products/delete`, {
      product: product,
    }) as Observable<{ message: string }>;
  }

  public getProductById(productId: string): Observable<Product> {
    return this.http.get(
      `${this.path}user/products/${productId}`
    ) as Observable<Product>;
  }

  public async shareProduct(productId: string): Promise<Observable<Product | any>> {
    return this.http.patch(
      `${this.path}user/products/share/${productId}`,
      {}
    ) as Observable<Product | any>;
  }
}
