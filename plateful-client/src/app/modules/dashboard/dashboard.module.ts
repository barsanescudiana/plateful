import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    FeatureCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    FeatureCardComponent
  ]
})
export class DashboardModule { }
