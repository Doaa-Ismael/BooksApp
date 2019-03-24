const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

module.exports = (nav) => {
    // Routing
    const authRouter = express.Router();
    authRouter.post('/signup', (req, res) => {
        const url = 'mongodb://127.0.0.1:27017';
        const dbName = 'libraryApp';
        (async()=>{
            try {
                let client = await MongoClient.connect(url);
                debug('Connected correctly to server');
                const db = client.db(dbName);
                let dbResponse = await db.collection('users').insertOne({
                    username: req.body.username, 
                    password: req.body.password
                });
                req.logIn(dbResponse.ops[0], () => {
                    res.redirect('/auth/profile');
                }); 
                client.close();
            }
            catch (e) {
                debug('Can\'t connect to db', e);
                return null;
            }

        })();

    })
    authRouter.post('/login', passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }))
    .get('/profile', (req, res, next) => {
        res.json(req.user);
    })
    .get('/login', (req, res, next) => {
        res.render('login', {
            nav, 
            title: 'Login'
        });
    })
    .get('/logout', (req, res) => { 
        req.logout();
        res.redirect('/');
    })



    return authRouter;

}


