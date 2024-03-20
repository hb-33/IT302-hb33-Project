//Harshit Bansal, 3/22/24, IT302-002, Phase 3 Assignment: C.U.D. MongoDB data using Node.js, hb33@njit.edu

import express from 'express'
import BreachesController from './breaches.controller.js'
import AnalysesControlelr from './analyses.controller.js'

const router = express.Router()

router.route('/').get(BreachesController.apiGetBreaches)

router.route('/analyses')
    .post(AnalysesController.apiPostAnalyses)
    .put(AnalysesController.apiUpdateReview)
    .delete(AnalysesController.apiDeleteReview)

export default router