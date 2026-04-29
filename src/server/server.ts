import express  from "express"
import path from "path"

const server = express()

server.use(express.static(path.join(__dirname, "../../public")))

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')  
})