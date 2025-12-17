import express from "express"
import cookieParser from "cookie-parser"
import routes from "./routes/v1_routes"
import { globalErrorHandler } from "./middlewares/Error"

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", routes)
app.use(globalErrorHandler)

