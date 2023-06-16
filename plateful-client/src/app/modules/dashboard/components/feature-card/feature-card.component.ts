import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {

  @Input() public featureForCard: {name: string, color: string, textColor: string, routerLink: string} | any;

  constructor( private router: Router) {
    this.featureForCard = {}
  }

  public handleCardClick(feature: {name: string, color: string, textColor: string, routerLink: string} | any): void {

    this.router.navigateByUrl(feature.routerLink);
  }
}
