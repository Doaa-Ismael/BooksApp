const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const bookService  = require('./../services/goodreadsService')();

let books = [
    { title: "Omar W salam", genre: "Romance", author: "Doaa", read: false },
    { title: "Keset 7ob", genre: "Romance", author: "Eman", read: false },
    { title: "Mission Imposiible", genre: "Action", author: "Ali", read: false },
    { title: "Fast fariuos 7", genre: "Action", author: "Omar", read: false },
    { title: "Cooker", genre: "Animation", author: "Mahmoud", read: false },
    { title: "sss", genre: "Fiction", author: "Essam", read: false }
];
module.exports = (nav) => {
    // Routing
    const adminRouter = express.Router();
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'libraryApp';
    adminRouter.get('/', async (req, res) => {
        try{
            let books = await bookService.getBooks();
            let client = await MongoClient.connect(url);
            debug('Connected correctly to server');
            const db = client.db(dbName);
            let dbResponse = await db.collection('books').insertMany(books);
            res.json(dbResponse);    
        }
        catch (e) {
            debug("Error", e.stack);
        }

    });
    return adminRouter;
};



