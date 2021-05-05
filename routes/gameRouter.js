const Router = require('express')
const router = new Router()
const GameController = require('../controller/gameController')

router.post('/game/create', GameController.createGame)
router.get('/game/list', GameController.getGames)
router.get('/game/:id', GameController.getOneGame)
router.post('/game/update', GameController.updateGame)







module.exports = router
