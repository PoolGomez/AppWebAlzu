import { Dispatch, SetStateAction } from "react"

export type FormCreateCategoryProps = {
    companyId: string;
    setOpenModalCreate : Dispatch<SetStateAction<boolean>>;
}