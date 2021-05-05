const Router = require('express')
const router = new Router()
const PlayerController = require('../controller/playerController')

router.post('/player/create', PlayerController.createPlayer)
router.get('/player/list', PlayerController.getPlayers)
router.get('/player/delete/:id', PlayerController.deletePlayer)






module.exports = router
