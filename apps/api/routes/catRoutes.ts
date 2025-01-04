import express from 'express'
import * as catController from '../controllers/catController'

const router = express.Router()

router.get('/cats/fetch', catController.fetchExternalCatsAndStoreIt)
router.get('/cats', catController.getCats)
router.put('/cats/:id', catController.updateCatScore)
router.get('/cats/matches-played', catController.getMatchesPlayed)

export default router
