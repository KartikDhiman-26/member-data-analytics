export default function Filters({
 departments,
 clubs,
 selectedDept,
 selectedClub,
 setSelectedDept,
 setSelectedClub
}){

 return(

  <div className="flex gap-4 mt-6">

   <select
    value={selectedDept}
    onChange={(e)=>setSelectedDept(e.target.value)}
    className="border p-2 rounded"
   >

    <option value="">All Departments</option>

    {departments.map(dept=>(
     <option key={dept}>{dept}</option>
    ))}

   </select>

   <select
    value={selectedClub}
    onChange={(e)=>setSelectedClub(e.target.value)}
    className="border p-2 rounded"
   >

    <option value="">All Clubs</option>

    {clubs.map(club=>(
     <option key={club}>{club}</option>
    ))}

   </select>

  </div>

 )
}