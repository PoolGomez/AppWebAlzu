import { Category, Product } from "@prisma/client";


export type FormProductProps = {
    product: Product;
    categories: Category[];
}