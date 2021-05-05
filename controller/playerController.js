const db = require('../db')
class PlayerController {
  async createPlayer(req, res) {
      await db.query('INSERT INTO player (name, last_name,current_name, email,points,captain,b_day, game_id ) values ($1,$2,$3,$4,$5,$6,$7,$8)', [req.body.player.name, req.body.player.lastName, req.body.player.currentName, req.body.player.email, req.body.player.points, req.body.player.captain, req.body.player.birthday, req.body.id])
      res.sendStatus(200)
  }

  async getPlayers(req, res) {
    const player = await db.query('SELECT * FROM player')
    res.json(player.rows)
  }
  async deletePlayer(req, res) {
    const id = req.params.id
    console.log(id)
    await db.query('DELETE FROM player where id = $1', [id])
    res.sendStatus(200)
  }


}

module.exports = new PlayerController();
