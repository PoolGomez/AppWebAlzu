import { OrderContainer } from "./components";

export default function SellPage({params}:{params:{companyId:string}}) {
  return (
    <div className="flex flex-col w-full h-full">

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4 w-full h-full">
      <OrderContainer companyId={params.companyId} />
      
      </div>
      
    </div>
  );
}
