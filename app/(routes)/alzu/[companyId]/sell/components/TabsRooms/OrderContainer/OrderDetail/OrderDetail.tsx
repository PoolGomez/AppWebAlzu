import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

export  function OrderDetail({listProducts}:{listProducts:Product[]}) {
  return (
    <div>
      <h2>Pedido</h2>
      {listProducts.map((item)=>(
        <Button key={item.id}>{item.name}</Button>
      ))}
    </div>
  )
}
