import { Product } from "@prisma/client";
import Link from "next/link";
import { FormDeleteProduct } from "../FormDeleteProduct";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function ListView({products}:{products: Product[]}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
        {products.map((product:any) => (
            
                <li key={product.id} 
                className="flex justify-between gap-x-6 py-5"
                >
                    
                        <Link className="flex min-w-0 gap-x-4" href={`./products/${product.id}`}>

                            <img alt="" src={product.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
                            <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900">{product.name}</p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">{product.category.name}</p>
                            </div>
                        </Link>
                        <Link className='flex items-center' href={`./products/${product.id}`}>
                            {/* <p className="text-sm/6 text-gray-900">sadsds</p> */}
                            {product.active ? (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1"> 
                                <div className="size-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs/5 text-gray-500">Activo</p>
                            </div>
                            ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-red-500/20 p-1">
                                <div className="size-1.5 rounded-full bg-red-500" />
                                </div>
                                <p className="text-xs/5 text-gray-500">Inactivo</p>
                            </div>
                            )}
                            {/* <Trash2 /> */}
                        </Link>
                        
                        <div className='flex items-center'>
                        <FormDeleteProduct productId={product.id}>
                            <Button variant="destructive">
                            <Trash2 className="w-6 h-6" />
                            </Button>
                        </FormDeleteProduct>
                        </div>
                    
                </li>
            
        ))}
        </ul>
  )
}
