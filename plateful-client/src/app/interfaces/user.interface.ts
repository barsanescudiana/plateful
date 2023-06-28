import { Friend } from "./friend.interface";
import { Product } from "./product.interface";
import { Recipe } from "./recipe.interface";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  products: Product[] | [];
  savedRecipes: Recipe[];
  friends: Friend[];
  shoppingListItems: string[];
  picture: string;
}

export interface UserPublicInfo {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface UserSuggestion {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  numberOfSharedProducts: number;
}
