const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const authRouter = require("./controllers/auth")
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

// Routes go here
app.use("/auth", authRouter)
app.listen(PORT, () => {
  console.log("The express app is ready!", PORT)
})
