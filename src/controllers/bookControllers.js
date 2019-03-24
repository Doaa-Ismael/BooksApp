
const debug = require('debug')('app:BookController');
const { MongoClient, ObjectID } = require('mongodb');
const bookService = require('./../services/goodreadsService')();

module.exports = function bookController (nav) {
    getIndex = (req, res) => {
        debug("Get Bokks");
        const url = 'mongodb://127.0.0.1:27017';
        const dbName = 'libraryApp';
        (async()=>{
            try {
                let client = await MongoClient.connect(url);
                debug('Connected correctly to server');
                const db = client.db(dbName);
                let dbResponse = await db.collection('books').find().toArray();
                debug(dbResponse)
                res.render('books', {
                    title: 'Books',
                    nav,
                    books: dbResponse
                });
                client.close();
            }
            catch (e) {
                debug('Can\'t connect to db', e);
                return null;
            }
    
        })();

    };

    getById =  (req, res) => {
        let id = req.params.id;
        const url = 'mongodb://127.0.0.1:27017';
        const dbName = 'libraryApp';
        (async()=>{
            try {
                let client = await MongoClient.connect(url);
                debug('Connected correctly to server');
                const db = client.db(dbName);
                let book = await db.collection('books').findOne({_id: ObjectID(id)});
                //debug(book);
                let goodreadsBook = await bookService.getBookById(book.id);
                book.description = goodreadsBook.description;
                debug(book);
                res.render('book', {
                    title: 'Book Details',
                    nav,
                    book
                })
                client.close();
            }
            catch (e) {
                debug('Can\'t connect to db', e);
                return null;
            }

        })();
    };
    return {
        getIndex,
        getById
    }
};