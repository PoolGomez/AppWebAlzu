import { Product, Size } from "@prisma/client";

export type ListPricesProps = {
    productId: string;
    sizes: Size[];
}