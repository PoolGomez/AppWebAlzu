import { Main } from "./Main";


export default function page() {

 


  return (
    <div  className='flex flex-col h-ful w-full'>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-2 gap-y-2 w-full h-full">

        <div className="rounded-lg bg-background ">

          <Main />

          

        </div>

        <div className="rounded-lg bg-background shadow-md">
          <h1>panel 2</h1>
        </div>

      </div>
    
    </div>
  )
}
