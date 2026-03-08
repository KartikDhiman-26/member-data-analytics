import { useState } from "react"
import { uploadExcel } from "../services/api"

export default function UploadBox({setData}){

 const [loading,setLoading]=useState(false)

 async function handleUpload(e){

  const file=e.target.files[0]

  if(!file) return

  const formData=new FormData()
  formData.append("file",file)

  setLoading(true)

  const res=await uploadExcel(formData)

  setData(res.data)

  setLoading(false)

 }

 return(

  <div className="mt-6">

   <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">

    Upload Excel

    <input
     type="file"
     onChange={handleUpload}
     className="hidden"
    />

   </label>

   {loading && (

    <div className="mt-4 flex items-center gap-2">

     <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

     <span className="text-sm text-gray-600">
      Processing Excel...
     </span>

    </div>

   )}

  </div>

 )
}