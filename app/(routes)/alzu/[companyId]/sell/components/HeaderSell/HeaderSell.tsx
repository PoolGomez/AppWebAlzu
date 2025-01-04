import { ShoppingBag } from "lucide-react";

export function HeaderSell() {
  return (
    <div className="flex items-center justify-start">
        <ShoppingBag className="mr-2"/>
        <h2 className="text-2xl">Vender</h2>

        {/* <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                <Plus className='h-4 w-4' /> 
                Crear Mesa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crear Mesa</DialogTitle>
                    <DialogDescription>
                        Crea y configura tu mesa.
                    </DialogDescription>
                </DialogHeader>

                <FormCreateTable companyId={companyId} setOpenModalCreate={setOpenModalCreate}/>
                
            </DialogContent>
        </Dialog> */}


    </div>
  )
}
