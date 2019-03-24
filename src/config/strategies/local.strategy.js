const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:localStrategy');
const { MongoClient, ObjectID } = require('mongodb');

module.exports = () => {
    passport.use(new Strategy({
        usernameField: 'username', 
        passwordField: 'password'
    }, (username, password, done) => {
        const url = 'mongodb://127.0.0.1:27017';
        const dbName = 'libraryApp';
        (async()=>{
            try {
                let client = await MongoClient.connect(url);
                debug('Connected correctly to server');
                const db = client.db(dbName);
                let user = await db.collection('users').findOne({
                    username
                });
                if(user.password == password) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
                client.close();
            }
            catch (e) {
                debug('Can\'t connect to db', e);
            }

        })();
        console.log("LOCAL STRATEGY: ");
        
    }))
}