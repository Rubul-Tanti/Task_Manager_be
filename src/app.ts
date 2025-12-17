import express from "express"
import cookieParser from "cookie-parser"
import routes from "./routes/v1_routes"
import { globalErrorHandler } from "./middlewares/Error"
import connectToMongoDb from "./db/mongoose"

export const app = express()
connectToMongoDb()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", routes)
app.use(globalErrorHandler)

