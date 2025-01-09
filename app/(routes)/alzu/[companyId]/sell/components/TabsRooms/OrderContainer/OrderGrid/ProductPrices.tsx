import { db } from "@/lib/db";

export async function ProductPrices({companyId, productId}:{companyId: string, productId: string}) {

    // const sizesWithProductPrices = await db.size.findMany({
    //     where: {
    //       companyId: companyId,
    //       active: true, // Opcional: si solo deseas los tamaños activos
    //       productPrices: {
    //         some: {
    //           productId: productId,
    //           active: true, // Opcional: si solo deseas precios activos
    //         },
    //       },
    //     },
    //     include: {
    //       productPrices: {
    //         where: {
    //           productId: productId,
    //           active: true, // Opcional
    //         },
    //       },
    //     },
    //   });

      // console.log("sizesWithProductPrices:",JSON.stringify(sizesWithProductPrices));

  return (
    <div>
      probando
    </div>
  )
}
