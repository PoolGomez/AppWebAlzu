"use client"
import { Separator } from "@/components/ui/separator";
import { Category, Product, Room, Table } from "@prisma/client";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
    room: Room,
    tables: Table[],
    categories: Category[],
    products: Product[]
}

export function OrderGrid(props:Props) {
    const{room,tables, categories, products} = props;
    const [columns, setColumns] = useState(room.columns);
    const [rows, setRows] = useState(room.rows);

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
    <div className="space-y-1">
            <h2 className="text-lg font-medium leading-none">
              {room.name}
              {selectedTable && (
                ` / ${selectedTable.name}`
              )}
            </h2>
            {/* <p className="text-sm text-muted-foreground">
              Configure las opciones de creación de la mesa.
            </p> */}
          </div>
          <Separator className="my-4" />
        
        {!selectedTable && (
            <div className="w-full h-[600px] grid gap-1 sm:gap-2 p-0"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
            >
            {Array.from({
                length: rows * columns,
            }).map((_, index) => {
                const row = Math.floor(index / rows);
                const column = index % rows;
                const keycell = `${row}-${column}`;

                const foundTable = tables.find((table) => table.column === column && table.row === row);

                if(foundTable){
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
                            {
                            foundTable.status === 'available' ? (
                                <button className="w-full h-full cursor-pointer bg-green-500 items-center justify-center" 
                                // onClick={()=>setTableCurrent(foundTable)}
                                onClick={()=>setSelectedTable(foundTable)}
                                >
                                {foundTable.name}
                                </button>
                            ) : foundTable.status === 'occupied' ? (
                                <button className="w-full h-full cursor-pointer bg-red-500 items-center justify-center" 
                                // onClick={()=>setTableCurrent(foundTable)}
                                >
                                {foundTable.name}
                                </button>
                            ): foundTable.status === 'reserved' ? (
                                <button className="w-full h-full cursor-pointer bg-yellow-500 items-center justify-center" 
                                // onClick={()=>setTableCurrent(foundTable)}
                                >
                                {foundTable.name}
                                </button>
                            ): 
                                <button className="w-full h-full cursor-pointer bg-gray-500 items-center justify-center" 
                                // onClick={()=>setTableCurrent(foundTable)}
                                >
                                {foundTable.name}
                                </button>
                            
                            }
                            
                        </div>
                    );
                }else{
                    return (
                    
                        <div
                        key={keycell}
                        className="bg-transparent flex items-center justify-center font-bold"
                        
                        >

                                    <button className="cursor-pointer items-center justify-center" 
                                    // onClick={()=>modalAddTable(row, column)}
                                    >
                                        {/* <Plus className='h-8 w-8 text-gray-500' /> */}
                                    </button>
                            

                            
                        </div>
                    );
                }

            })}
            </div>
        )}

        {selectedTable && !selectedCategory && (
            // <div className="w-full min-h-[600px] grid gap-1 sm:gap-2 p-0">

<div className="w-full min-h-[600px] max-w-4xl mx-auto p-2">
      <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">Categorias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((item) => (
          <button
            key={item.id}
            // onClick={() => onSelect(item)}
            onClick={()=>setSelectedCategory(item)}
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

        {selectedCategory && (


<div className="w-full min-h-[600px] max-w-4xl mx-auto p-2">
      <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {products.map((item) => {

            if(item.categoryId === selectedCategory.id){
                return(
                    <button
            key={item.id}
            // onClick={() => onSelect(item)}
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
                )
            }

        }
            
          
        
        )}
      </div>
    </div>


        )}
        
        </>
  )
}
