import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

  constructor(private swPush: SwPush, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.swPush.requestSubscription({
      serverPublicKey: 'BPi0LFeoiUhvkt2hiWqvVr2NJtn4I-BGxZBsnXLtQEHh7fbg8p-QzvQPqz1cd2OMUIezfx56qW5dOfQXjDBsvdM',
    }).then(res => {
      console.log(res);
      this.dashboardService.updateMyNotificationSettings(res).subscribe(res=> console.log('did it'));
    });
  }
}
