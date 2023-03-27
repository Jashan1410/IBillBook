const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const authentication = require('./routes/auth')
const History = require('./routes/History')
const Users = require('./routes/Users')
const cors = require('cors')
require('./Database')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

app.use('/api/authentication',authentication);
app.use('/api/History',History);
app.use('/api/Users',Users);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})