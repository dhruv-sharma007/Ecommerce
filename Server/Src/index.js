import app from "./app.js"
import ConnectDB from "./DB/Connect.DB.js"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT

ConnectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}/`)
    })
})
.catch((error)=>{
    console.log(`ERROR: ${error}`)
    throw error
})
