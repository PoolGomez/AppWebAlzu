import { HeaderOrders, ListOrders } from "./components"

export default async function OrdersPage({params}:{params:{companyId:string}}) {

  return (
    <div className='h-screen w-auto'>
        <HeaderOrders />
        <ListOrders companyId={params.companyId} />
    </div>
  )
}
