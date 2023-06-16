import { Storage } from "../enums/storage.enum";
import { NutritionalValues } from "./nutritional-values.interface";

export interface Product {
    id: string;
    name: string;
    expirationDate: string;
    quantity: number;
    measurement: string;
    storage: Storage;
    category: string;
    nutritionalValues: NutritionalValues;
    isShared: boolean;
    isClaimed: boolean;
    dateAdded: Date

}