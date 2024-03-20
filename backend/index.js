//Harshit Bansal, 3/22/24, IT302-002, Phase 3 Assignment: C.U.D. MongoDB data using Node.js, hb33@njit.edu

import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import BreachesDAO from './dao/breachesDAO.js'
import AnalysesDAO from './dao/analysesDAO.js'


async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.BREACHES_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await BreachesDAO.injectDB(client)
    await AnalysesDAO.injectDB(client)

    app.listen(port, () => {
      console.log('server is running on port:' + port);
    })

  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}
main().catch(console.error);