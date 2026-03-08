const XLSX = require("xlsx")

const handleExcelUpload = (req, res) => {

  try {

    const filePath = req.file.path

    const workbook = XLSX.readFile(filePath)

    const sheetName = workbook.SheetNames[0]

    const sheet = workbook.Sheets[sheetName]

    const data = XLSX.utils.sheet_to_json(sheet)

    // unique students
    const seenUID = new Set()
    const uniqueStudents = []

    data.forEach(student => {
      if (!seenUID.has(student.member_uid)) {
        seenUID.add(student.member_uid)
        uniqueStudents.push(student)
      }
    })

    // analytics
    const deptCounts = {}
    const clubCounts = {}

    uniqueStudents.forEach(student => {

      const dept = student["Department Name"] || "Unknown"
      const club = student["Club Name"] || "Unknown"

      deptCounts[dept] = (deptCounts[dept] || 0) + 1
      clubCounts[club] = (clubCounts[club] || 0) + 1
    })

    res.json({
      total_rows: data.length,
      unique_students: uniqueStudents.length,
      students: uniqueStudents,
      analytics: {
        students_per_department: deptCounts,
        students_per_club: clubCounts
      }
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Excel processing failed" })
  }
}

module.exports = { handleExcelUpload }