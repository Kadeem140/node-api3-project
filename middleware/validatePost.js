const posts = require("../posts/postDb") //import all modules from this file

function validatePost(){
    return (req, res, next) => {
        if(!req.body){
            res.status(400).json({
                message: "missing post data"
            })
        } else if(!req.body.text){
            res.status(400).json({
                message: "missing required text field"
            })
        }
        next()
    }
}

module.exports = validatePost