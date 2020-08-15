const express = require('express');
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express();
const PORT = 4001;

server.use(userRouter)
server.use(postRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
        const time = new Date().toISOString();
        console.log(`${req.method} ${time} {req.url} `)
        next()
}

server.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`)
})
module.exports = server;
