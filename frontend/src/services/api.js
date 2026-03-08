import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export const uploadExcel = (formData) => {
  return API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}