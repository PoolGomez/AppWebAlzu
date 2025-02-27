"use client";
import { Separator } from "@/components/ui/separator";
import { OrderFull } from "@/domain";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/formatPrice";
import { Category, Product, ProductPrice, Room, StatusOrder, StatusTable, Table } from "@prisma/client";
import axios from "axios";
import { ChevronLeft, ChevronRight, LoaderCircle, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { OrderDetail } from "./OrderDetail";
import { useWebSocket } from "@/hooks/useWebSocket";

type Props = {
    companyId:string,
};

export function OrderContainer(props: Props) {
    const { companyId } = props;

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<ProductPrice | null>(null);
    const [selectedSizeName, setSelectedSizeName] = useState<String | null> (null);
    const [order, setOrder] = useState<OrderFull | null>(null);


    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [total, setTotal] = useState(0);
    


    const [roomsApi, setRoomsApi] = useState<Room[]>([]);
    // const [tablesApi, setTablesApi] = useState<Table[]>([]);
    const {tablesApi, actualizarMesas } = useWebSocket(selectedRoomId);
    const [ categoriesApi, setCategoriesApi] = useState<Category[]>([]);
    const [ productsApi, setProductsApi] = useState<Product[]>([]);
    const [productPricesApi, setProductPricesApi] = useState<ProductPrice[]>([]);

    const [isPending, startTransition] = useTransition();
    const [isPendingSendOrders, startTransitionSendOrders] = useTransition();
    const router = useRouter();

    const calculateTotal = () => {
        if(selectedPrice){
          const priceFinal = (parseFloat(selectedPrice.amount.toString()) / 100 ) * quantity;
        //   setTotal(priceFinal)
          return priceFinal;
        }
        // setTotal(0)
        return 0;
    };

    const changeStatusTable = (estado : StatusTable) =>{
      const nuevasMesas = tablesApi.map((mesa) =>
        mesa.id === selectedTable?.id ? { ...mesa, status: estado} : mesa
      );
      actualizarMesas(nuevasMesas);
    }
    const handleSubmit = () => {
        startTransition(async () => {
          try {

            console.log("selectedPrice:", selectedPrice?.amount)
            if(!selectedPrice?.amount){
              console.log("Debe seleccionar un precio")
              toast({
                title: "Warning",
                description: "Debe seleccionar un precio para continuar",
                variant: "destructive",
              });
              return
            }

            if(!order){
                //crear order si no existe
                await axios.post("/api/order", {
                    roomId: selectedRoom?.id,
                    companyId: companyId,
                    tableId: selectedTable?.id,
                    total: selectedPrice.amount * quantity,
                    notes: "",
                    status: "created",
                    items: [
                        {
                            productId: selectedProduct?.id, 
                            sizeName: selectedSizeName,
                            quantity: quantity,
                            price: Number(selectedPrice?.amount),
                            notes: notes,
                            status: "created"
                        }
                    ]
                  });
                  
                  // if(selectedTable){
                  //   setSelectedTable( (prevState: any) => ({
                  //     ...prevState,
                  //     status: StatusTable.occupied
                  //   }))
                  // }
                  
            }else{
                //crear el orderItem a la order existente
                await axios.post("/api/order-item",{
                    orderId : order.id,
                    productId: selectedProduct?.id,
                    sizeName: selectedSizeName,
                    quantity: quantity,
                    price: selectedPrice?.amount,
                    notes: notes,
                    status: "created",
                    //este campo va actualizar el total de la orden
                    newTotal: order.OrderItem.reduce((acumulador, order) => acumulador + ( order.quantity * order.price ) ,0) + (selectedPrice.amount * quantity)
                })
            }

            changeStatusTable(StatusTable.occupied)

              

              setSelectedProduct(null)
              setSelectedPrice(null)
              getOrders();
              toast({
              title: "✅ Correcto",
              description: "Pedido agregado exitosamente",
              });
              router.refresh();
          } catch (error) {
            console.log("error:",error)
              toast({
                title: "Error",
                description: "Error al crear el pedido",
                variant: "destructive",
              });
          }
          });
      }

      useEffect(()=>{
        if(selectedPrice){
            setTotal(selectedPrice.amount * quantity)
        }
      },[order, quantity, selectedPrice])
    
    
      useEffect(() => {
        async function fetchRooms() {
          try {
            const {data} = await axios.get("/api/room",{
              params: {
                companyId: companyId
              }
            });
            setRoomsApi(data);
          } catch (error) {
            console.error('Error loading rooms:', error);
          }
          
        }
        fetchRooms();
      }, [])
    
      useEffect(() => {
        
        if (!selectedRoom) return;
        setSelectedRoomId(selectedRoom?.id);
        // async function fetchTables() {
        //   try {
        //     const {data} = await axios.get("/api/table",{
        //       params:{
        //         roomId: selectedRoom?.id
        //       }
        //     });
        //     setTablesApi(data);
        //   } catch (error) {
        //     console.error('Error loading tables:', error);
        //   }
        // }
        // fetchTables();
      }, [selectedRoom])
    
      async function getOrders(){
        try{
          const { data } = await axios.get("/api/order",{
            params:{
              tableId: selectedTable?.id,
              status: StatusOrder.completed
            }
          });
          setOrder(data)
        }catch(error){
          console.error('Error loading orders:', error);
        }
      }
    
      function sendOrders(){
        startTransitionSendOrders(async()=>{
          try {
            // orders.forEach(async (order) => {
            //   await axios.patch(`/api/order`, {
            //     tableId: selectedTable.id
            //     // status: StatusOrder.progress
            //   });
            // })
            await axios.patch(`/api/order-item`, {
              companyId: companyId,
              orderId: order?.id
              // status: StatusOrder.progress
            });
            
            // toast({
            //   title: "✅ Correcto",
            //   description: "Pedidos enviados exitosamente",
            // });
            
            // router.refresh();
          } catch (error) {
            console.log(error);
            toast({
              title: "Error",
              description: "Error al enviar el pedido",
              variant: "destructive",
            });
          }finally{
            // setOrders([])
            getOrders();
            toast({
              title: "✅ Correcto",
              description: "Pedidos enviados exitosamente",
            });
            // initialValues.current = formValues;
            // router.refresh();
          }
        })
        
      }
    
      const onDeleteOrder = async (orderId : string) => {
        startTransition(async () => {
          try {
            // console.log("order antes:", orders)
            // setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            await axios.delete(`/api/order/${orderId}`);
            toast({
              title: "✅ Correcto",
              description:"producto borrado del pedido exitosamente"
            });
            
    
            await getOrders()
            // router.refresh();
            console.log("order despues:", order)
          } catch (error) {
            console.log(error);
            toast({
              title: "Error",
              description:"Error al borrar el producto del pedido",
              variant: "destructive",
            });
          }
        });
      };
    
      useEffect(() => {
        if (!selectedTable) {
          setOrder(null)
          return;
        } 
        
        async function fetchCategories() {
          try {
            const {data} = await axios.get("/api/category",{
              params:{
                companyId: companyId 
              }
            });
            setCategoriesApi(data);
          } catch (error) {
            console.error('Error loading categories:', error);
          }
        }
        fetchCategories();
        getOrders();
      }, [selectedTable]);
    
      useEffect(() => {
        if (!selectedCategory) return;
        async function fetchProducts() {
          try {
            const {data} = await axios.get("/api/product",{
              params:{
                categoryId: selectedCategory?.id 
              }
            });
            setProductsApi(data);
          } catch (error) {
            console.error('Error loading products:', error);
          }
        }
        fetchProducts();
      }, [selectedCategory])
      
      useEffect(() => {
        if (!selectedProduct) return;
        async function fetchProductPrices() {
          try {
            const {data} = await axios.get("/api/product-price",{
              params:{
                productId: selectedProduct?.id 
              }
            });
            setProductPricesApi(data);
            setSelectedPrice(data[0]);
            setSelectedSizeName(data[0].size.name);
            
            
          } catch (error) {
            console.error('Error loading product-prices:', error);
          }
        }
        fetchProductPrices();
      }, [selectedProduct])
    
    
      const handleBack = () => {
        if(selectedProduct){
          setSelectedProduct(null);
        }else if (selectedCategory) {
          setSelectedCategory(null);
        } else if (selectedTable) {
          setSelectedTable(null);
        } else if (selectedRoom) {
          setSelectedRoom(null);
          setSelectedRoomId(null)
        }
      };
    

  return (
    <>
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 w-full h-full">
        {!selectedRoom && (
          <div className="w-full min-h-[600px] max-w-4xl mx-auto p-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center text-2xl font-bold text-secondary-foreground justify-center">
                Salas
              </h2>

              {/* <button
                  onClick={handleBack}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft className="w-5 h-5 text-secondary-foreground" />
                  <span className="text-secondary-foreground">Volver</span>
                </button> */}
            </div>
            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {roomsApi.map((item) => (
                <button
                  key={item.id}
                  // onClick={() => onSelect(item)}
                  onClick={() => {
                    setSelectedRoom(item) 
                    setSelectedRoomId(item.id)
                  }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex items-center space-x-4"
                >
                  {/* {showImage && item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )} */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    {/* {showPrice && item.price && (
                <p className="text-green-600 font-medium">
                  {item.price.toFixed(2)} €
                </p>
              )} */}
                    {/* {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )} */}
                  </div>
                  <ChevronRight className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedRoom && !selectedTable && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center text-2xl font-bold text-secondary-foreground justify-center">
              {selectedRoom.name}
              </h2>

              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5 text-secondary-foreground" />
                <span className="text-secondary-foreground">Volver</span>
              </button>
            </div>
            <Separator className="my-4" />
            <div
              className="w-full h-[600px] grid gap-1 sm:gap-2 p-0"
              style={{
                gridTemplateColumns: `repeat(${selectedRoom.columns}, 1fr)`,
                gridTemplateRows: `repeat(${selectedRoom.rows}, 1fr)`,
              }}
            >
              {Array.from({
                length: selectedRoom.rows * selectedRoom.columns,
              }).map((_, index) => {
                const row = Math.floor(index / selectedRoom.columns);
                const column = index % selectedRoom.columns;
                const keycell = `${row}-${column}`;

                const foundTable = tablesApi.find(
                  (table) =>
                    table.column === column &&
                    table.row === row &&
                    table.roomId === selectedRoom.id
                );

                if (foundTable) {
                  return (
                    <div
                      key={foundTable.id}
                      // className={`
                      //   relative h-10 border border-gray-200
                      //   flex items-center justify-center cursor-pointer
                      //   before:absolute before:inset-0 before:border-t before:border-l before:border-gray-100
                      //   after:absolute after:inset-0 after:border-b after:border-r after:border-gray-100 hover:bg-gray-50
                      // `}
                      className="bg-white border border-gray-300 flex items-center justify-center font-bold"
                      //   onClick={modalAddTable}
                    >
                      {/* <div
                                className={`
                                    text-sm font-medium px-2 py-1 rounded bg-white text-primary
                                `}
                                >
                                    {foundTable.name}
                                </div> */}
                      {foundTable.status === "available" ? (
                        <button
                          className="w-full h-full cursor-pointer bg-green-500 items-center justify-center"
                          // onClick={()=>setTableCurrent(foundTable)}
                          onClick={() => setSelectedTable(foundTable)}
                        >
                          {foundTable.name}
                        </button>
                      ) : foundTable.status === "occupied" ? (
                        <button
                          className="w-full h-full cursor-pointer bg-red-500 items-center justify-center"
                          // onClick={()=>setTableCurrent(foundTable)}
                        >
                          {foundTable.name}
                        </button>
                      ) : foundTable.status === "reserved" ? (
                        <button
                          className="w-full h-full cursor-pointer bg-yellow-500 items-center justify-center"
                          // onClick={()=>setTableCurrent(foundTable)}
                        >
                          {foundTable.name}
                        </button>
                      ) : (
                        <button
                          className="w-full h-full cursor-pointer bg-gray-500 items-center justify-center"
                          // onClick={()=>setTableCurrent(foundTable)}
                        >
                          {foundTable.name}
                        </button>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={keycell}
                      className="bg-transparent flex items-center justify-center font-bold"
                    >
                      <button
                        className="cursor-pointer items-center justify-center"
                        // onClick={()=>modalAddTable(row, column)}
                      >
                        {/* <Plus className='h-8 w-8 text-gray-500' /> */}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {selectedTable && !selectedCategory && (
          // <div className="w-full min-h-[600px] grid gap-1 sm:gap-2 p-0">

          <div className="w-full min-h-[600px] max-w-4xl mx-auto p-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center text-2xl font-bold text-secondary-foreground justify-center">
              {/* {selectedRoom?.name + " / " + selectedTable.name} */}
              {selectedRoom?.name} <ChevronRight /> {selectedTable?.name }
                {/* Categorias */}
              </h2>

              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5 text-secondary-foreground" />
                <span className="text-secondary-foreground">Volver</span>
              </button>
            </div>
            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {categoriesApi.map((item) => (
                <button
                  key={item.id}
                  // onClick={() => onSelect(item)}
                  onClick={() => setSelectedCategory(item)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex items-center space-x-4"
                >
                  {/* {showImage && item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )} */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    {/* {showPrice && item.price && (
                <p className="text-green-600 font-medium">
                  {item.price.toFixed(2)} €
                </p>
              )} */}
                    {/* {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )} */}
                  </div>
                  <ChevronRight className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          // </div>
        )}

        {selectedCategory && !selectedProduct && (
          <div className="w-full min-h-[600px] max-w-4xl mx-auto p-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center text-2xl font-bold text-secondary-foreground justify-center">
              {selectedRoom?.name} <ChevronRight /> {selectedTable?.name }<ChevronRight />{ selectedCategory.name}
                {/* Productos */}
              </h2>

              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5 text-secondary-foreground" />
                <span className="text-secondary-foreground">Volver</span>
              </button>
            </div>
            <Separator className="my-4" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsApi.map((item: any) => {
                if (item.categoryId === selectedCategory.id) {
                  return (
                    <button
                      key={item.id}
                      onClick={()=>setSelectedProduct(item)}
                      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      
                      <div  className="w-full h-48 relative">

                          <Image 
                            // src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" 
                            src={item.imageUrl}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg" 
                          />



                      </div>

                      <div 
                      className="p-2"
                      
                      >
                      
                      <h2 
                      
                      className="text-lg font-semibold text-gray-800  truncate"
                        style={{
                          fontSize: 'clamp(0.75rem, 1vw, 1rem)', // Ajusta dinámicamente entre 12px y 16px.
                          lineHeight: '1',
                          whiteSpace: 'normal', // Permite envolver el texto.
                          wordWrap: 'break-word', // Divide palabras largas.
                          overflow: 'hidden', // Evita desbordes.
                          height: '2rem', // Altura fija para mantener consistencia
                          
                        }}
                      >
                        {item.name}
                      </h2>
                      <h3
                      className="text-lg font-semibold text-gray-500 truncate"
                      style={{
                        fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', // Ajusta dinámicamente 
                        lineHeight: '1.2',
                        whiteSpace: 'normal', // Permite envolver el texto.
                        wordWrap: 'break-word', // Divide palabras largas.
                        overflow: 'hidden', // Evita desbordes.
                        height: '1rem', // Altura fija para mantener consistencia  //1.5rem
                      }}
                      >
                        {item.category.name}
                      </h3>
                    </div>
                      
                    </button>
                  );
                }
              })}
            </div>
          </div>
        )}

        {selectedProduct && (
          <div className="w-full min-h-[600px] max-w-4xl mx-auto p-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center text-2xl font-bold text-secondary-foreground justify-center">
              {selectedProduct.name}
                {/* Productos */}
              </h2>

              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5 text-secondary-foreground" />
                <span className="text-secondary-foreground">Volver</span>
              </button>
            </div>
            <Separator className="my-4" />
            

            
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
              <p className="text-gray-600 mt-1">{selectedProduct.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Tamaño</h3>
            <div className="grid grid-cols-3 gap-3">
              {productPricesApi.length === 0 && (
                <button
                className={`p-3 rounded-lg border-2 border-gray-200`}
              >
                <div className="font-medium">No existe</div>
                <div className="text-sm text-gray-600">
                  Tamaños
                </div>
              </button>
              )}
              {productPricesApi.map((price:any) => (
                <button
                  key={price.id}
                  onClick={()=> {
                    setSelectedPrice(price) 
                    setSelectedSizeName(price.size.name)
                  }}
                  className={`p-3 rounded-lg border-2 ${
                    selectedPrice?.id === price.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium">{price.size.name}</div>
                  <div className="text-sm text-gray-600">
                    {/* {price.amount.toFixed(2)} € */}
                    {formatPrice( (parseFloat(price.amount.toString()) /100 ))}
                    {/* {price.amount?.toString()} € */}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* {product.addOns && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Adicionales</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.addOns.map(addOn => (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn)}
                    className={`p-3 rounded-lg border-2 ${
                      selectedAddOns.find(item => item.id === addOn.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{addOn.name}</div>
                    <div className="text-sm text-gray-600">+ {addOn.price.toFixed(2)} €</div>
                  </button>
                ))}
              </div>
            </div>
          )} */}

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-lg border border-gray-200"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-lg border border-gray-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Notas especiales</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebolla, poco picante..."
              className="w-full p-3 border border-gray-200 rounded-lg"
              rows={2}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                {/* {calculateTotal().toFixed(2)} € */}
                {/* {formatPrice(calculateTotal())} */}
                {formatPrice(total / 100)}
              </span>
            </div>

            <div className="flex gap-3">
              {/* <button
                // onClick={onClose}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-200"
              >
                Cancelar
              </button> */}
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 px-4 rounded-lg bg-blue-600 text-white font-medium"
                disabled={isPending}
              >
                {isPending && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Añadir al pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    {/* </div> */}



          </div>
        )}

      </div>

      <div className="flex flex-col min-h-[600px] max-h-[800px] rounded-lg bg-background shadow-md hover:shadow-lg p-2 sm:p-4 w-full h-full">
        <OrderDetail  
          orders={order} 
          onDeleteOrder={onDeleteOrder} 
          sendOrders={sendOrders} 
          isPendingSendOrders={isPendingSendOrders} 
          table={selectedTable}
          setSelectedTable={setSelectedTable}
          changeStatusTable={changeStatusTable}
          getOrders={getOrders}
        />
      </div>
    </>
  )
}
