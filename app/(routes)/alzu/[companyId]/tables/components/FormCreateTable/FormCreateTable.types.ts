import { Dispatch, SetStateAction } from "react"

export type FormCreateTableProps = {
    companyId: string;
    setOpenModalCreate : Dispatch<SetStateAction<boolean>>;
}