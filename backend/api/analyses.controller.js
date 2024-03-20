//Harshit Bansal, 3/22/24, IT302-002, Phase 3 Assignment: C.U.D. MongoDB data using Node.js, hb33@njit.edu

import AnalysesDAO from '../dao/analysesDAO.js'

export default class AnalysesController {

  static async apiPostReview(req,res,next) {
    try {
      const breachId = req.body.breach_id
      const analysis = req.body.analysis
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }

      const date = new Date()

      const AnalysisResponse = await AnalysesDAO.addAnalysis(
        breachId,
        userInfo,
        analysis,
        date
      )
    res.json(AnalysisResponse)
    } catch(e) {
    res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateAnalysis(req,res,next) {
    try {
      const analysisId = req.body.analysis_id
      const analysis = req.body.analysis
      const date = new Date()
      const AnalysisResponse = await AnalysesDAO.updateAnalysis(
        analysisId,
        req.body.user_id,
        analysis,
        date
      )
  
      var { error } = AnalysisResponse
      if(error) {
        res.status.json({error})
      }
      if(AnalysisResponse.modifiedCount === 0) {
        throw new Error ("unable to update analysis.")
      }
      res.json(AnalysisResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }

  static async apiDeleteAnalysis(req,res,next) {
    try {
      const analysisId = req.body.analysis_id
      const userId = req.body.user_id
      const AnalysisResponse = await AnalysesDAO.deleteAnalysis(
        analysisId,
        userId,
      )
      res.json(AnalysisResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
  
}
