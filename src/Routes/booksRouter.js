const express = require('express');
const sql = require('mssql');
const passport = require('passport');


let books = [
    {title: "Omar W salam", genre: "Romance", author: "Doaa", read: false},
    {title: "Keset 7ob", genre: "Romance", author: "Eman", read: false},
    {title: "Mission Imposiible", genre: "Action", author: "Ali", read: false},
    {title: "Fast fariuos 7", genre: "Action", author: "Omar", read: false},
    {title: "Cooker", genre: "Animation", author: "Mahmoud", read: false},
    {title: "sss", genre: "Fiction", author: "Essam", read: false}
];

module.exports = (nav) => {
    const bookController = require('./../controllers/bookControllers')(nav);
    // Routing
    const bookRouter = express.Router();
    // bookRouter.use((req, res, next) => {
    //     if(req.user)
    //         next();
    //     else 
    //         res.redirect('/')
    // })
    bookRouter.get('/', bookController.getIndex);

    bookRouter.get('/:id', bookController.getById);

    return bookRouter;

}


