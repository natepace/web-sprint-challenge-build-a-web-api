const express = require('express');
const server = express();
const cors = require("cors");
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
server.use(cors())
server.use(express.json())

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)
server.get('/', (req, res) => {
    res.send(`<h2>hey errbody</h2>`)
})
module.exports = server;
