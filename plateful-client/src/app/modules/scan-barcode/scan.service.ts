import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ScanService {
  private path = "http://localhost:3030/api/product/";

  constructor(private http: HttpClient) {}

  public getProductByBarcode(barcode: string): Observable<any> {
    return this.http.get(`${this.path}barcode`, {
      params: {
        code: barcode,
      },
    }) as Observable<any>;
  }
}
