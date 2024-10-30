import { Size } from "@prisma/client";
import { Dispatch, SetStateAction } from "react"

export type FormCreatePriceProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    sizes: Size[]
}