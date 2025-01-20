
"use client"
import { OrderProducto } from "@/domain";
import { formatPrice } from "@/lib/formatPrice";
import { StatusOrder, Table } from "@prisma/client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { CookingPot, Download, LoaderCircle, Printer, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentoPdf } from "./DocumentPdf";



export  function OrderDetail(
  {orders, onDeleteOrder,sendOrders, isPendingSendOrders, table}:
  {
    orders: OrderProducto[], 
    onDeleteOrder: (orderId: string)=>void,
    sendOrders: ()=>void,
    isPendingSendOrders: boolean,
    table: Table | null
  }) {
  const [ totalOrder , setTotalOrder ] = useState(0);
  const [ countOrderCreated, setCountOrderCreated] = useState(false)



  // const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    validarPendientes()
    const getTotal = () => {
      calculateTotalOrder()
    }
    getTotal();
  }, [orders])


  const validarPendientes = () => {
    let bandera = false;
    orders.forEach((order)=>{
      if(order.status === StatusOrder.created){
        bandera = true;
      }
    })
    setCountOrderCreated(bandera);
  }
  



  const calculateTotalOrder = () => {
    
    const tota = orders.reduce((acumulador, order) => acumulador + ( order.quantity * (parseFloat(order.price.toString()) / 100) ) ,0)
    setTotalOrder(tota);

    
  }

  
  return (

    // <div className="pointer-events-auto w-full">
          // <div className="flex min-h-[600px] max-h-[800px] flex-col bg-white shadow-xl">
<>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-secondary-foreground" id="slide-over-title">Pedido</h2>
                
                <div className="flex gap-4" >
                <Printer />
                <PDFDownloadLink
                    // document={<DocumentoPdf {...data} />}
                    document={<DocumentoPdf
                      // companyName="Empresa" 
                      orderId="0001"
                      table={table}
                      items={orders}
                      // total={totalOrder} 
                      />}

                    fileName="comanda.pdf"
                  >
                    {/* {({ loading }) =>
                      loading ? 'Cargando documento...' : 'Descargar PDF'
                    } */}
                    <Download />
                  </PDFDownloadLink>
                </div>
                {/* <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div> */}
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {orders.map((order)=>(
                      
                      <li key={order.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img 
                            // src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" 
                            src={order.product.imageUrl}
                            alt={order.product.name}
                            className="size-full object-cover" 
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-secondary-foreground">
                              <h3>
                                <a href="#">{order.product.name}</a>
                              </h3>
                              <p className="ml-4">{formatPrice( order.quantity * ( parseFloat(order.price.toString()) / 100))}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-700">{order.sizeName}</p>
                            <p className="mt-1 text-sm text-gray-500">{order.notes}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-secondary-foreground">x{order.quantity}</p>
                            {/* <button onClick={()=>onSubmit(order.id, "progress")}>enviar</button> */}

                            <span>{order.status}</span>

                            <div className="flex">
                              {order.status === StatusOrder.created && (
                                <button type="button" className="font-medium text-red-500 hover:text-red-800" onClick={()=>onDeleteOrder(order.id)}><Trash2  className="mr-2 h-8 w-8"/></button>
                              )}

                              {order.status === StatusOrder.progress && (
                                <button type="button" className="font-medium text-orange-500"><CookingPot className="mr-2 h-8 w-8 animate-bounce"/></button>
                              )}
                              
                              
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                    
                  </ul>
                </div>
              </div>
            </div>

            {totalOrder > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-xl font-medium text-secondary-foreground">
                  <p>Subtotal</p>
                  <p>{formatPrice(totalOrder)}</p>
                </div>
                {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                
                  {countOrderCreated && (
                    <div className="mt-4">
                    <button
                      onClick={()=>sendOrders()}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      disabled={isPendingSendOrders}
                    >
                      {isPendingSendOrders && <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>}
                      Enviar
                    </button>
                    </div>
                  )}
                  
                  
                

                <div className="mt-4">
                  <button
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    // onClick={print}
                  >
                    Pagar
                  </button>
                  
                </div>
                {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div> */}

              </div>
            )}
            
            </>
          // </div>
    
    // </div>

    
  )
}

