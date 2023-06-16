import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PantryComponent } from './modules/pantry/pantry.component';
import { FriendsPantryComponent } from './modules/friends-pantry/friends-pantry.component';
import { RecipesComponent } from './modules/recipes/recipes.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pantry',
    component: PantryComponent
  },
  {
    path: 'friends-products',
    component: FriendsPantryComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
