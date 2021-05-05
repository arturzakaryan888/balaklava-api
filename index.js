const express = require('express')
const PORT = process.env.PORT || 8080
const playerRouter = require('./routes/playerRouter')
const gameRouter = require('./routes/gameRouter')
const app = express()


app.use(express.json())
app.use('/api',playerRouter)
app.use('/api',gameRouter)

app.listen(PORT, () => {
  console.log(`Server has been started ${PORT}`)
})
