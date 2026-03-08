import { useState } from "react"

export default function Topbar({
 setSearch,
 onExportExcel,
 onExportPNG
}){

 const [open,setOpen]=useState(false)

 return(

  <div className="flex justify-between items-center mb-6">

   <h2 className="text-3xl font-bold">
    Member Analytics Dashboard
   </h2>

   <div className="flex items-center gap-4">

    <input
     type="text"
     placeholder="Search students..."
     onChange={(e)=>setSearch(e.target.value)}
     className="border px-3 py-2 rounded"
    />

    <div className="relative">

     <button
      onClick={()=>setOpen(!open)}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
     >
      Export
     </button>

     {open && (

      <div className="absolute right-0 mt-2 bg-white border rounded shadow w-44">

       <button
        onClick={()=>{
         setOpen(false)
         onExportExcel()
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
       >
        Export Excel
       </button>

       <button
        onClick={()=>{
         setOpen(false)
         onExportPNG()
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
       >
        Export Graph PNG
       </button>

      </div>

     )}

    </div>

   </div>

  </div>

 )
}