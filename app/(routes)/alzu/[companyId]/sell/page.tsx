import { HeaderSell, TabsRooms } from "./components";

export default function SellPage({params}:{params:{companyId:string}}) {
  return (
    <div className="flex flex-col w-full h-full">
      <HeaderSell />
      <TabsRooms companyId={params.companyId}/>
    </div>
  );
}
