//Harshit Bansal, 3/1/24, IT302-002, Phase 2 Assignment: Read MongoDB data using Node.js, hb33@njit.edu

import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import BreachesDAO from './dao/breachesDAO.js'


async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.BREACHES_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await BreachesDAO.injectDB(client)

    app.listen(port, () => {
      console.log('server is running on port:' + port);
    })

  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}
main().catch(console.error);