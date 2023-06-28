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

  public addProduct(
    userId: string,
    product: Product
  ): Observable<{ message: string }> {
    return this.http.patch(`${this.path}user/products/add`, {
      userId: userId,
      product: product,
    }) as Observable<{ message: string }>;
  }

  public getProductById(
    productId: string,
    userId: string
  ): Observable<Product> {
    return this.http.get(`${this.path}user/products/${productId}`, {
      params: {
        userId: userId,
      },
    }) as Observable<Product>;
  }

  public shareProduct(productId: string): Observable<Product | any> {
    return this.http.patch(`${this.path}user/products/share`, {
      productId: productId,
    }) as Observable<Product | any>;
  }
}
