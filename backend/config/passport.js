const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');
const Tutor = require("../models/Tutor")

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    
    

    passport.use('tutor',
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log('test')
            Tutor.findById(jwt_payload.id)
            .then(tutor => {
                console.log("passport")
                if(tutor) {
                    return done(null, tutor)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
        })
    );

    passport.use('user',
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    console.log("passport")
                    if(user) {
                        //console.log(user)
                        return done(null, user);
                    } 
                    return done(null, false);
                })
                .catch(err => console.log(err))
        })
    );
        
};