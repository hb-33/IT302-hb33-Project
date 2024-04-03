//Harshit Bansal, 4/12/24, IT302-002, Phase 4 Assignment: Read Node.js Data using React.js, hb33@njit.edu

import express from 'express'
import BreachesController from './breaches.controller.js'
import AnalysesController from './analyses.controller.js'

const router = express.Router()

router.route('/').get(BreachesController.apiGetBreaches)
router.route("/id/:id").get(BreachesController.apiGetBreachById)

router.route('/analysis')
    .post(AnalysesController.apiPostAnalysis)
    .put(AnalysesController.apiUpdateAnalysis)
    .delete(AnalysesController.apiDeleteAnalysis)

export default router