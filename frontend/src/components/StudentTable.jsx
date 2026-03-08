export default function StudentTable({students}){

 if(!students) return null

 return(

  <div className="mt-10 bg-white p-6 rounded shadow">

   <table className="w-full border">

    <thead className="bg-gray-100">

     <tr>
      <th className="p-2 border">Name</th>
      <th className="p-2 border">UID</th>
      <th className="p-2 border">Department</th>
      <th className="p-2 border">Club</th>
     </tr>

    </thead>

    <tbody>

     {students.map((student,i)=>(

      <tr key={i}>

       <td className="border p-2">
        {student.member_name}
       </td>

       <td className="border p-2">
        {student.member_uid}
       </td>

       <td className="border p-2">
        {student["Department Name"]}
       </td>

       <td className="border p-2">
        {student["Club Name"]}
       </td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )

}