import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public features: {name: string, color: string, textColor: string, routerLink: string}[] = [
    {
      name: 'Pantry',
      color: '#A5A6F6',
      textColor: '#5D5FEF',
      routerLink: '/pantry'
    },
    {
      name: "Friends' products",
      color: '#F99ACB',
      textColor: '#EF5DA8',
      routerLink: '/friends-products'

    },
    {
      name: 'Recipes',
      color: '#98E8D4',
      textColor: '#2EC6A2',
      routerLink: '/recipes'

    },
    {
      name: 'Shopping list',
      color: '#A5D4F6',
      textColor: '#5DB2EF',
      routerLink: '/shopping-list'

    }
  ]
}
