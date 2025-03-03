//Harshit Bansal, 4/26/24, IT302-002, Phase 5 Assignment: CUD Node.js Data using React.js, hb33@njit.edu

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let breaches

export default class BreachesDAO {
  static async injectDB(conn) {
    if (breaches) {
      return
    } try {
      breaches = await conn.db(process.env.BREACHANALYSES_NS).collection('breaches_hb33')
    } catch(e) {
      console.error(`unable to connect in BreachesDAO: ${e}`)
    }
  }
  
  static async getBreaches({
    filters = null,
    page = 0,
    breachesPerPage = 20,
    } = {}) {
      let query
      if(filters) {
        if("Name" in filters) {
          query = { "Name": { $eq: filters['Name']}}
        } else if("Domain" in filters) {
          query = { "Domain": { $eq: filters['Domain']}}
        } else if("BreachDate" in filters) {
          query = { "BreachDate": { $eq: filters['BreachDate']}}
        }

    }
    let cursor
    try {
      cursor = await breaches
        .find(query)
        .limit(breachesPerPage)
        .skip(breachesPerPage * page)
      const breachesList = await cursor.toArray()
      const totalNumBreaches = await breaches.countDocuments(query)
      return {breachesList, totalNumBreaches}
    } catch(e) {
      console.error(`Unable to issue find command, ${e}`)
      console.error(e)
      return { breachesList: [], totalNumBreaches: 0 }
    }
  }

  static async getBreachById(id) {
    try {
      return await breaches.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          }
        },
        { $lookup:
          {
            from: 'analyses',
            localField: '_id',
            foreignField: 'breach_id',
            as: 'analyses'
          }
        }
      ]).next()
    }
    catch(e) {
      console.error(`something went wrong in getBreachById: ${e}`)
      throw e
    }
  }
}
