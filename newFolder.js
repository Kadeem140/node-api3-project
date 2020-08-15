const fs = require("fs")

fs.mkdirSync("data")

"abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
    fs.mkdirSync(`data/${letter}`)
})