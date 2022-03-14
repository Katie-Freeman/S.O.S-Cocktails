const jwt = require('jsonwebtoken')
const models= require('../models')

function authenticate(req, res, next) {
    const headers = req.headers['authorization']
    if(headers) {
        const token= headers.split(' ')[1]
        jwt.verify(token, process.env.JWTKEY, function(err, decoded){
            if(err){
                res.json({ success:false, message: 'Unable to authenticate!'})
            }else{
                const username = decoded.username
                models.User.findOne({
                    where: {
                        username:username,
                    },
                }).then((user) => {
                    if(user) {
                        next()
                    }else {
                        res.json({success: false, message: 'Unable to authenitcate!'})
                    }
                })
            }
        })
    }
}

modules.exports = authenticate