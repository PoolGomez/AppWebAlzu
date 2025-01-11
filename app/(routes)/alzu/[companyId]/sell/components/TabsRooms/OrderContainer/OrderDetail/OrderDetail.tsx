"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/formatPrice";
import { Order, StatusOrder, Table } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export  function OrderDetail({orders, onDeleteOrder}:{orders: Order[], onDeleteOrder: (orderId: string)=>void}) {
  const [ totalOrder , setTotalOrder ] = useState(0);
  // const [isPending, startTransition] = useTransition();
  // const router = useRouter();

  // const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getTotal = () => {
      calculateTotalOrder()
    }
    getTotal();
  }, [orders])

  const calculateTotalOrder = () => {
    const tota = orders.reduce((acumulador, order) => acumulador + parseFloat( order.total.toString()) ,0)
    setTotalOrder(tota);
  }

  

  // async function getOrders(){
  //   try{
  //     const { data } = await axios.get("/api/order",{
  //       params:{
  //         tableId: table?.id,
  //         status: StatusOrder.created
  //       }
  //     });
  //     setOrders(data)
  //   }catch(error){
  //     console.error('Error loading orders:', error);
  //   }
  // }
  
  return (

    // <div className="pointer-events-auto w-full">
          // <div className="flex min-h-[600px] max-h-[800px] flex-col bg-white shadow-xl">
<>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Pedido</h2>
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
                          <img src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="size-full object-cover" />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{order.productName}</a>
                              </h3>
                              <p className="ml-4">{formatPrice(parseFloat(order.total.toString()))}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-700">{order.sizeName}</p>
                            <p className="mt-1 text-sm text-gray-500">{order.note}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">x{order.quantity}</p>

                            <div className="flex">
                              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>onDeleteOrder(order.id)}>Eliminar</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                    {/* <li className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="size-full object-cover" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Throwback Hip Bag</a>
                            </h3>
                            <p className="ml-4">$90.00</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Salmon</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty 1</p>

                          <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="size-full object-cover" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p className="ml-4">$32.00</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty 1</p>

                          <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li> */}

                    

                    {/* <!-- More products... --> */}
                  </ul>
                </div>
              </div>
            </div>

            {totalOrder > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatPrice(totalOrder)}</p>
                </div>
                {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                <div className="mt-6">
                  <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Finalizar</a>
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


{/* <div>
      <h2>Pedido</h2>
      {orders.map((item)=>(
        <Button key={item.id}>{item.productName}</Button>
      ))}
    </div> */}