import { CartItem } from "./cart-item.model";

export interface Mail {
  items: CartItem[];
  prenom: string;
  nom: string;
  societe: string;
  // pays: string;
  adresse: string;
  adressebis: string;
  ville: string;
  code: string;
  tel: string;
  email: string;
  totalprice: number;
  delivery: string;
  id?: number;
  objet: string;
  message: string;
}
