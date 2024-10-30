import { HeaderSizes } from "./components/HeaderSizes";
import { ListSizes } from "./components/ListSizes";

export default function SizesPage({params}:{params:{companyId:string}}) {
  return (
    <div>
      <HeaderSizes companyId={params.companyId}/>
      <ListSizes companyId={params.companyId}/>
    </div>
  )
}
