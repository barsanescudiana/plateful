import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public categories: string[] = ["Meat",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Grains",
    "Beverages",
    "Sweets",
    "Snacks"];
  public qualities: string[] = ["Expiring next week", "Expiring in 2 days", "Expiring tomorrow"];
}
