export interface ProduitSeul {
    lenght: number;
    Produit: Array <{
        Object: {
            id: number;
            titre: string;
            ref: string;
            imageURL: string;
            prixav: string;
            prixap: number;
            presentation: string;
            categorie: string;
            description: string;
            info: string;
            commm: string;
        }
    }>;
}
