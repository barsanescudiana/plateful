import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { PantryComponent } from "./modules/pantry/pantry.component";
import { FriendsPantryComponent } from "./modules/friends-pantry/friends-pantry.component";
import { RecipesComponent } from "./modules/recipes/recipes.component";
import { ShoppingListComponent } from "./modules/shopping-list/shopping-list.component";
import { AuthComponent } from "./modules/auth/auth.component";
import { AuthGuard } from "./guards/auth.guard";
import { SettingsComponent } from "./modules/settings/settings.component";
import { NotificationsComponent } from "./modules/notifications/notifications.component";
import { ProductFormComponent } from "./modules/product-form/product-form.component";
import { ProfileComponent } from "./modules/profile/profile.component";
import { ScanBarcodeComponent } from "./modules/scan-barcode/scan-barcode.component";
import { ProductOverviewComponent } from "./modules/product-overview/product-overview.component";
import { AddFriendsComponent } from "./modules/add-friends/add-friends.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth/login",
    component: AuthComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pantry",
    component: PantryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "friends-products",
    component: FriendsPantryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "scan",
    component: ScanBarcodeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "product/:productId",
    component: ProductOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add-friends",
    component: AddFriendsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
