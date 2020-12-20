const expressJwt = require('express-jwt');
const config = require('../utils/config.json');
const { getById } = require("../models/users")

module.exports = jwt;

function jwt() {
    const secret = config.secret;

       return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({

        path: [        
            // public routes that don't require authentication
            '/favicon.ico', //if this path not added, favicon.ico 401 error occcurs
            '/users/authenticate',
            '/users/register',
        ]
    });
}

async function isRevoked(req, payload, done) {  
    console.log("payload sub: " + payload.sub)
    const user = await getById(payload.sub);
    console.log("user : "+ user.username)
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};