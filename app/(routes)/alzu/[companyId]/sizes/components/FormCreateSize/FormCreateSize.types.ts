import { Dispatch, SetStateAction } from "react"

export type FormCreateSizeProps = {
    companyId: string;
    setOpenModalCreate : Dispatch<SetStateAction<boolean>>;
}