import express from "express"
import cors from "cors"
import route from "./route/route.js"
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js"
export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({
    limits:{fileSixe:50*1024*1024},
    useTempFiles:true
}))
app.use(cors())

app.use("/",route)
app.use(errorHandler)