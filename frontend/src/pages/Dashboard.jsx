import { useState } from "react"

import Topbar from "../components/Topbar"
import UploadBox from "../components/UploadBox"
import DashboardCards from "../components/DashboardCards"
import { DepartmentPie,ClubPie } from "../components/Charts"
import Filters from "../components/Filters"
import StudentTable from "../components/StudentTable"

import { exportStudents } from "../utils/exportExcel"

export default function Dashboard(){

 const [data,setData]=useState(null)

 const [selectedDept,setSelectedDept]=useState("")
 const [selectedClub,setSelectedClub]=useState("")
 const [search,setSearch]=useState("")

 const departments=data
 ?[...new Set(data.students.map(s=>s["Department Name"]))]
 :[]

 const clubs=data
 ?[...new Set(data.students.map(s=>s["Club Name"]))]
 :[]

 let filteredStudents=data
 ?data.students.filter(student=>{

  const deptMatch =
   !selectedDept ||
   student["Department Name"]===selectedDept

  const clubMatch =
   !selectedClub ||
   student["Club Name"]===selectedClub

  const searchMatch =
   !search ||
   student.member_name
    .toLowerCase()
    .includes(search.toLowerCase())

  return deptMatch && clubMatch && searchMatch

 })
 :[]

 function generateCounts(list,key){

  const counts={}

  list.forEach(item=>{
   const value=item[key]
   counts[value]=(counts[value]||0)+1
  })

  return counts
 }

 const deptChart = generateCounts(
  filteredStudents,
  "Department Name"
 )

 const clubChart = generateCounts(
  filteredStudents,
  "Club Name"
 )

 /* EXPORT PNG */

 function exportCharts(){

  const charts=document.querySelectorAll("canvas")

  if(!charts.length){
   alert("Charts not ready yet")
   return
  }

  const canvas1=charts[0]
  const canvas2=charts[1]

  const combined=document.createElement("canvas")

  combined.width=canvas1.width*2
  combined.height=canvas1.height

  const ctx=combined.getContext("2d")

  ctx.fillStyle="#ffffff"
  ctx.fillRect(0,0,combined.width,combined.height)

  ctx.drawImage(canvas1,0,0)
  ctx.drawImage(canvas2,canvas1.width,0)

  const link=document.createElement("a")

  link.download="analytics_charts.png"
  link.href=combined.toDataURL("image/png")

  link.click()

 }

 return(

  <div className="bg-gray-100 min-h-screen p-10">

   <Topbar
    setSearch={setSearch}
    onExportExcel={()=>exportStudents(filteredStudents)}
    onExportPNG={exportCharts}
   />

   <UploadBox setData={setData}/>

   {data && (

    <>

     <DashboardCards totalRows={data.total_rows}/>

     <Filters
      departments={departments}
      clubs={clubs}
      selectedDept={selectedDept}
      selectedClub={selectedClub}
      setSelectedDept={setSelectedDept}
      setSelectedClub={setSelectedClub}
     />

     <div className="grid grid-cols-2 gap-10 mt-8">

      <div className="bg-white p-6 rounded shadow flex justify-center">
       <DepartmentPie data={deptChart}/>
      </div>

      <div className="bg-white p-6 rounded shadow flex justify-center">
       <ClubPie data={clubChart}/>
      </div>

     </div>

     <StudentTable students={filteredStudents}/>

    </>

   )}

  </div>

 )
}