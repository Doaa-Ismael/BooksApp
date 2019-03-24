const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadService');
const parser = xml2js.Parser({explicitArray: false});


module.exports = () => {

    function getBookById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=LsjjqmIJrME48J2Loam9mA`)
            .then(res => {
                parser.parseString(res.data, (err, result) => {
                    if(err) 
                        debug(err);
                    else {
                        //debug(result.GoodreadsResponse);
                        resolve(result.GoodreadsResponse.book)
                    }
                })
            })
            .catch(e => {
                debug(e);
                reject(e);
            })
        })
    }

    function getBooks() {
        return new Promise((resolve, reject) => {
            axios.get('https://www.goodreads.com/search/index.xml?key=LsjjqmIJrME48J2Loam9mA&q=Software')
            .then(res => {
                parser.parseString(res.data, (err, result) => {
                    if(err) {
                        debug(err);
                    }
                    else {
                        let books = [];
                        result.GoodreadsResponse.search.results.work.map(result => {
                            books.push({
                                title: result.best_book.title,
                                author: result.best_book.author.name,
                                image_url: result.best_book.image_url,
                                id: result.best_book.id._                                
                            });
                        })
                        resolve(books)
                    }
                })
            })
            .catch(e => {
                debug(e);
                reject(e);
            })
        })
    }

    return {
        getBookById,
        getBooks
    }
}