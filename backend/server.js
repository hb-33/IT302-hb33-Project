import express from 'express'
import cors from 'cors'
import breaches from './api/breaches.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/hb33/breaches", breaches)

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app