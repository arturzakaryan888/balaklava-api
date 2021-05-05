const db = require('../db')

class GameController {
  async createGame(req, res) {
    /*  Сдесь нужна валидация  */
    let users = []
    let newGameWithUsers
    const newGame = await db.query('INSERT INTO game (zone_type,phone,status,payment,reserved_date) values ($1,$2,$3,$4,$5) RETURNING *', [req.body.zoneType, req.body.phone, "planned", req.body.payment, req.body.reservedDate])
    newGameWithUsers = newGame.rows[0]
    for (let i = 0; i < req.body.users.length; i++) {
      let user = await db.query('INSERT INTO player (name, last_name,current_name, email,points,captain,b_day, game_id ) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [req.body.users[i].name, req.body.users[i].lastName, req.body.users[i].currentName, req.body.users[i].email, req.body.users[i].points, req.body.users[i].captain, req.body.users[i].birthday, newGame.rows[0].id])
      users.push(user.rows[0])
    }
    newGameWithUsers = {...newGameWithUsers, users: users}
    res.json(newGameWithUsers)
  }

  async getGames(req, res) {
    const games = await db.query('SELECT * FROM game')
    res.json(games.rows)
  }

  async getOneGame(req, res) {
    let gameWithPlayers
    const id = req.params.id
    const game = await db.query('SELECT * FROM game where id = $1', [id])
    gameWithPlayers = game.rows[0]
    const players = await db.query('SELECT * FROM player where game_id = $1', [id])
    gameWithPlayers = {...gameWithPlayers, players: players.rows}
    res.json(gameWithPlayers)
  }

  async updateGame(req, res) {
    let players = []
    let updateGameWithPlayers
    await db.query('UPDATE game set zone_type = $1, phone = $2, status = $3, payment = $4, reserved_date = $5 where id = $6', [req.body.zoneType, req.body.phone, req.body.status, req.body.payment, req.body.reserved_date, req.body.id])
    const updateGame = await db.query('SELECT * FROM game where id = $1', [req.body.id])
    updateGameWithPlayers = updateGame.rows[0]
    if (req.body.players) {
      for (let i = 0; i < req.body.players.length; i++) {
        await db.query('UPDATE player set name = $1, last_name = $2,current_name = $3, email = $4,points = $5 ,captain = $6,b_day = $7 where game_id = $8', [req.body.players[i].name, req.body.players[i].lastName, req.body.players[i].currentName, req.body.players[i].email, req.body.players[i].points, req.body.players[i].captain, req.body.players[i].birthday, req.body.id])
        let updatePlayers = await db.query('SELECT * FROM player where game_id = $1', [req.body.id])
        players.push(updatePlayers.rows[0])
      }
    }
    updateGameWithPlayers = {...updateGameWithPlayers, players: players}
    res.json(updateGameWithPlayers)
  }
}

module.exports = new GameController()
