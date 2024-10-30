import { Category } from "@prisma/client";
import { Dispatch, SetStateAction } from "react"

export type FormCreateProductProps = {
    companyId: string;
    categories: Category[];
    setOpenModalCreate : Dispatch<SetStateAction<boolean>>;
}