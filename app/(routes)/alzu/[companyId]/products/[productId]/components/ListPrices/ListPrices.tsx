import { db } from "@/lib/db";
import { ListPricesProps } from "./ListPrices.types";
import { Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormInformationPrice } from "./FormInformationPrice";
import { FormDeletePrice } from "./FormDeletePrice";


export async function ListPrices(props:ListPricesProps) {
    const {product} = props;

    const productPrices = await db.productPrice.findMany({
        where: {
            productId: product.id
        },
        include: {
            size: true, // Incluye la relación con la categoría
        }
    })

    if(productPrices.length === 0){
        return <p>Actualmente no existen precios</p>
    }
    
    // console.log("productPrices: ",productPrices)

    // const test = () =>{
    //     console.log('test')
    //     console.log("productPrices: ",productPrices)
    // }

  return (
    <div>
        <div className="mt-4 mb-2 grid grid-cols-4 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 rounded-lg">
            
            <p className="text-sm lg:text-sm">Tamaño</p>
            <p className="text-sm lg:text-sm">Precio</p>
            <p className="text-sm lg:text-sm">Activo</p>
            <p className="text-right text-sm lg:text-sm">Acciones</p>
        </div>
        {productPrices.map((price: any) =>(
            <div key={price.id}>
                {/* {JSON.stringify(price)} */}
                <div className="grid grid-cols-4 gap-x-3 items-center justify-between px-4">
                    
                    <p className="text-xs lg:text-sm">{price.size.name}</p>
                    <p className="text-sm lg:text-sm">{formatPrice(price.amount)}</p>
                    {/* <p>{ price.active === true ? <Badge variant="outline">Si</Badge> : <Badge variant="destructive">No</Badge>}</p> */}
                    <span>{ price.active === true ? <Badge variant="outline">Si</Badge> : <Badge variant="destructive">No</Badge>}</span>
                    {/* <p>si</p> */}
                    <div className="flex items-center gap-x-2 justify-end">
                        {/* <a href={`telto: ${price.phone}`} target="_blank"> */}
                        {/* <Button className="w-8 h-8" variant="default">
                            <Pencil className="w-4 h-4" />
                        </Button> */}

                        <FormInformationPrice />

                        {/* <Button className="w-6 h-6" variant="default">
                            <Pencil className="w-4 h-4" />
                        </Button> */}

                        

                        <FormDeletePrice priceId={price.id}>
                            <Button className="w-8 h-8" variant="destructive">
                                <Trash2 className="w-4 h-4"/>
                            </Button>
                        </FormDeletePrice>
                            
                        {/* </a> */}
                        {/* <a href={`mailto: ${price.email}`} target="_blank">
                            <Mail className="w-4 h-4" />
                        </a> */}
                    </div>
                </div>
                <Separator className="my-3" />
            </div>

        ))
        }
    </div>
  )
}
