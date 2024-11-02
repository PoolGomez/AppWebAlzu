import { Metadata } from "next"
import Image from "next/image"




import { AlbumArtwork } from "./components/album-artwork"
// import { Menu } from "./components/menu"
import { Sidebar } from "./components/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "./data/albums"
import { playlists } from "./data/playlists"
import { PlusCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { db } from "@/lib/db"
import { CardProduct } from "./components/CardProduct"

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default async function SellPage({params}:{params:{companyId:string}}) {

  const products = await db.product.findMany({
      where:{
          companyId : params.companyId
      },
      include: {
        category: true, // Incluye la relación con la categoría
      },
      orderBy:{
          createdAt: "desc"
      }
  })

  const categories= await db.category.findMany({
      where:{
          companyId : params.companyId
      },
      orderBy:{
          createdAt: "desc"
      }
  })

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div> */}
      <div 
      // className="hidden md:block"
      >
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              {/* <Sidebar playlists={playlists} className="hidden lg:block" /> */}
              
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                  <div className="h-full px-4 py-6 lg:px-8">

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight pb-2">
                              Vender
                            </h2>
                            {/* <p className="text-sm text-muted-foreground">
                              Elija el producto
                            </p> */}
                      </div>

                      <div className="ml-auto mr-4">
                        <Button>
                          <ShoppingCart className="mr-2 h-4 w-4"/>
                        </Button>
                      </div>

                    </div>

                  <Tabs defaultValue="todos" className=" space-y-6">
                    <div 
                    className="relative"
                    >
                      {/* <div className="space-between flex items-center"> */}
                      <ScrollArea className="w-[400px] lg:w-auto whitespace-nowrap ">
                                    <TabsList className="h-30">

                                      <TabsTrigger value="todos" className="p-4 text-xl">
                                        Todos
                                      </TabsTrigger>
                                      {categories.map((category)=>(
                                        <TabsTrigger key={category.id} value={category.id} className="p-4 text-xl">{category.name}</TabsTrigger>  
                                      ))}
                                      <TabsTrigger value="otros" disabled>...</TabsTrigger>




                                    </TabsList>
                          <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                      </div>
                      
                    {/* </div> */}
                    <TabsContent value="todos" className="border-none p-0 outline-none">

                      {/* <Separator className="my-4" /> */}
                      <div className="flex flex-1 flex-col gap-4 p-4">
                      <div className="grid auto-rows-min gap-4 grid-cols-3 md:grid-cols-5">
                        {products.map((product)=>(
                          <CardProduct
                            key={product.id}
                            product={product}
                            // className="w-[150px]"
                            aspectRatio="square"
                            width={150}
                            height={150}
                          />
                        ))}
                        {/* {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-xl bg-muted/50" />
                        ))} */}
                      </div>
                    </div>
                    </TabsContent>

                    {
                      categories.map((categoria)=>(
                        <TabsContent key={categoria.id} value={categoria.id}>
                          <div className="flex flex-1 flex-col gap-4 p-4">
                            <div className="grid auto-rows-min gap-4 grid-cols-3 md:grid-cols-5">
                              {products.map((prod)=>{
                                if(prod.categoryId === categoria.id){
                                
                                  return(
                                    <CardProduct
                                      key={prod.id}
                                      product={prod}
                                      // className="w-[150px]"
                                      aspectRatio="square"
                                      width={150}
                                      height={150}
                                    />
                                    )

                                }
                                
                              }
                              )}
                              {/* {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="aspect-square rounded-xl bg-muted/50" />
                              ))} */}
                            </div>
                          </div>
                          </TabsContent>
                      ))
                    }

                    <TabsContent value="Lasagna">
                    <div className="flex flex-1 flex-col gap-4 p-4">
                      <div className="grid auto-rows-min gap-4 grid-cols-3 md:grid-cols-5">
                        {madeForYouAlbums.map((album)=>(
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            // className="w-[150px]"
                            aspectRatio="portrait"
                            width={150}
                            height={150}
                          />
                        ))}
                        {/* {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-xl bg-muted/50" />
                        ))} */}
                      </div>
                    </div>
                    </TabsContent>

                    <TabsContent
                      value="pizza"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}