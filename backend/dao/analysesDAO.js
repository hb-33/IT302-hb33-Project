//Harshit Bansal, 4/12/24, IT302-002, Phase 4 Assignment: Read Node.js Data using React.js, hb33@njit.edu

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let analyses
export default class AnalysesDAO {
  static async injectDB(conn) {
    if(analyses) {
      return
    } try {
      analyses = await conn.db(process.env.BREACHANALYSES_NS).collection('analyses')
    } catch(e) {
      console.error(`unable to establish connection handle in analysesDAO: ${e}`)
    }
  }

  static async addAnalysis(breachId, user, analysis, date) {
    try {
      const analysisDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        analysis: analysis,
        breach_id: new ObjectId(breachId)
      }
      return await analyses.insertOne(analysisDoc)
    } catch(e) {
      console.error(`unable to post analysis: ${e}`)
      console.error(e)
      return { error: e }
    }
  }

  static async updateAnalysis(analysisId, userId, analysis, date) {
    try {
      const updateResponse = await analyses.updateOne(
        { user_id: userId, _id: new ObjectId(analysisId) },
        { $set: { analysis: analysis, date: date } }
      )
      return updateResponse
    } catch(e) {
      console.error(`unable to update analysis: ${e}`)
      console.error(e)
      return { error: e}
    }
  }

  static async deleteAnalysis(analysisId, userId) {
    try {
      const deleteResponse = await analyses.deleteOne({
        _id: new ObjectId(analysisId),
        user_id: userId,
      })
      return deleteResponse
    } catch(e) {
      console.error(`unable to delete analysis: ${e}`)
      console.error(e)
      return { error: e.message }
    }
  }
}