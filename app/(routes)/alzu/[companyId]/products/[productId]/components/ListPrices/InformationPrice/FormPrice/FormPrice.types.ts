import { ProductPrice, Size } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormPriceProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    productPrice: ProductPrice;
    size: Size;
}