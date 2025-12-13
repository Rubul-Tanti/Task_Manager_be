// app.ts
import express from "express"
import cookieParser from "cookie-parser"
// import routes from "./routes"
// import { errorHandler } from "./middlewares/error.middleware"

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("app is running")
})

// app.use("/api/v1", routes)

// app.use(errorHandler)
