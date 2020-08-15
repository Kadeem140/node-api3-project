const users = require("../users/userDb") //import all modules from this file
//getByID
function validateUserId(){
    return (req, res, next) => {
        users.getById(req.params.id) //checks to see if the user id is valid
            .then((user) =>{ //if so the we resolve the promise
                if(user){
                    req.user = user //if user is truthy set req.user to the user response.
                    next() //then keep it moving
                } else {
                    res.status(400).json({
                        message: "invalid user id"
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "Error retrieving the user",
                })
                next()
            })
    }
}

// function validateUser(req, res, next){
//     return(req, res, next) => {
//         console.log("Body", req.body)
//         if(!req.body){
//           return  res.status(400).json({
//                 message: "missing user data"
//             })
//         } else if(!req.body.name){
//            return res.status(400).json({
//                 message: "Missing Name value!"
//             })
//         }
//         else {
//             next()
//         } //keep it moving
//     }
// }

// function validateUser(req, res, next){
//     !req.body ? req.status(400).json({
//         message: "Missing User data"
//     }) : next()
    
// }

module.exports = {
    // validateUser,
    validateUserId
}