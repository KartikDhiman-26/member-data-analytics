export default function DashboardCards({totalRows}){

 return(

  <div className="mt-6">

   <div className="bg-white shadow p-6 rounded w-64">

    <p className="text-gray-500">
     Total Records
    </p>

    <h2 className="text-3xl font-bold">
     {totalRows}
    </h2>

   </div>

  </div>

 )

}