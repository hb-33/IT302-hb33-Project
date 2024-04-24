//Harshit Bansal, 4/26/24, IT302-002, Phase 5 Assignment: CUD Node.js Data using React.js, hb33@njit.edu

import BreachesDAO from '../dao/breachesDAO.js'

export default class BreachesController {
  static async apiGetBreaches(req,res,next) {
    const breachesPerPage = req.query.breachesPerPage ? parseInt(req.query.breachesPerPage) : 20
    const page = req.query.page ? parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.Domain){
      filters.Domain = req.query.Domain
    } else if(req.query.Name){
        filters.Name = req.query.Name
    } else if(req.query.BreachDate){
        filters.BreachDate = req.query.BreachDate
    }
    const { breachesList, totalNumBreaches } = await BreachesDAO.getBreaches({
    filters, page, breachesPerPage})

    let response = {
      breaches: breachesList,
      page: page,
      filters: filters,
      entries_per_page: breachesPerPage,
      total_results: totalNumBreaches,
    }
    res.json(response)
   }

   static async apiGetBreachById(req, res, next) {
    try {
      let id = req.params.id || {}
      let breach = await BreachesDAO.getBreachById(id)
      if(!breach) {
        res.status(404).json({ error: "not found"})
        return
      }
      res.json(breach)
    } catch(e) {
        console.log(`api, ${e}`)
        res.status(500).json({error: e})
      }
    }
}