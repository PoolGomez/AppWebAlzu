import { cn } from "@/lib/utils"
import { Product } from "@prisma/client"
import Image from "next/image"

type AlbumArtworkProps 
// extends React.HTMLAttributes<HTMLDivElement>
 ={
    product: Product
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function CardProduct(props : AlbumArtworkProps) {
    const {product, aspectRatio, width, height} = props;
    const {category} = product as any;
  return (
    <div className="space-y-3" >
      {/* <ContextMenu>
        <ContextMenuTrigger> */}
          <div className="overflow-hidden rounded-md">
            <Image
              src={product.imageUrl !== "" ? product.imageUrl : "/images/company-icon.png"}
              alt="image"
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.description ==="" ? "Sin categoria": category.name}</p>
      </div>
    </div>
  )
}
