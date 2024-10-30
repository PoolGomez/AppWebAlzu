import { FormProduct } from "../FormProduct";
import { Coins, Info, NotebookTabs, User } from "lucide-react";
import { NewPrice } from "../NewPrice";
import { InformationProductProps } from "./informationProduct.types";
import { ListPrices } from "../ListPrices";


export function InformationProduct(props: InformationProductProps) {
  const { product, categories , sizes} = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg px-4 py-2">
          
          <div className="flex items-center pb-2 text-xl">
            <NotebookTabs className="w-5 h-5 mr-2" />
            Información
          </div>

        <div>
          <FormProduct product={product} categories={categories} />
        </div>
      </div>

      {/* PRECIOS */}
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2 text-xl">
            <Coins className="w-5 h-5" />
            Precios
          </div>
          <div>
            {/* TODO: New Contact */}
            {/* <Button>Nuevo</Button> */}
            <NewPrice sizes={sizes}/>
          </div>
        </div>
        <ListPrices product={product}/>
      </div>

      {/* <FooterCategory categoryId={category.id} /> */}
    </div>
  );
}
