import * as XLSX from "xlsx"

export function exportStudents(data){

 const sheet=XLSX.utils.json_to_sheet(data)

 const workbook=XLSX.utils.book_new()

 XLSX.utils.book_append_sheet(
  workbook,
  sheet,
  "Students"
 )

 XLSX.writeFile(workbook,"students.xlsx")

}