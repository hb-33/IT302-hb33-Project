//Harshit Bansal, 4/12/24, IT302-002, Phase 4 Assignment: Read Node.js Data using React.js, hb33@njit.edu

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