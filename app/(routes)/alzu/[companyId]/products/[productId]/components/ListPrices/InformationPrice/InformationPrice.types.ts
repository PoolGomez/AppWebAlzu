import { ProductPrice, Size } from "@prisma/client";

export type InformationPriceProps = {
    productPrice: ProductPrice;
    size: Size;
}