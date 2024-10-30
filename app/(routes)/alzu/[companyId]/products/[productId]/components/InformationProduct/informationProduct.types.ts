import { Category, Product, Size } from "@prisma/client";

export type InformationProductProps = {
    product: Product;
    categories: Category[];
    sizes: Size[]
}