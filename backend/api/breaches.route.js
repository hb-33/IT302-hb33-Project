//Harshit Bansal, 3/1/24, IT302-002, Phase 2 Assignment: Read MongoDB data using Node.js, hb33@njit.edu

import express from 'express'
import BreachesController from './breaches.controller.js'

const router = express.Router()

router.route('/').get(BreachesController.apiGetBreaches)

export default router