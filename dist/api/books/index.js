/// <reference path="../../_all.d.ts" />
"use strict";
const pg_service_1 = require("../../services/pg.service");
const execFile = require('child_process').execFile;
const cloudinary = require('cloudinary');
let cheerio = require('cheerio');
cloudinary.config({
    cloud_name: 'db5v7kkij',
    api_key: '874821816721741',
    api_secret: 'sh4SDortqqGlpZZJ3ZllyxTBrNA'
});
class Books {
    constructor() {
        this.pgSvc = new pg_service_1.PgService();
    }
    getBooksList() {
        let self = this;
        let sql = `SELECT * FROM books`;
        return new Promise((resolve, reject) => {
            self.pgSvc.query({ querySQL: sql, queryArgs: [] })
                .then((res) => {
                resolve(res.rows);
            });
        });
    }
    createNewBook(bookData) {
        let self = this;
        return self.uploadCover(bookData.cover_url)
            .then((newUrl) => {
            let now = new Date().getTime();
            let queryArgs = [
                bookData.publish_date || '',
                bookData.price || 0,
                bookData.model || '',
                bookData.name,
                bookData.author,
                newUrl,
                bookData.sku,
                now,
                bookData.summary || ''
            ];
            return self.insertBook(queryArgs);
        })
            .then((response) => {
            return response.rows[0];
        });
    }
    updateBook(bookId, bookData) {
        let self = this;
        return self.uploadCover(bookData.cover_url)
            .then((newUrl) => {
            let now = new Date().getTime();
            let queryArgs = [
                bookData.publish_date || '',
                bookData.price || 0,
                bookData.model || '',
                bookData.name,
                bookData.author,
                newUrl,
                bookData.sku,
                now,
                bookData.summary || ''
            ];
            return self.updateBookInternal(bookId, queryArgs);
        })
            .then((response) => {
            return response.rows[0];
        });
    }
    deleteBook(bookId) {
        let self = this;
        return new Promise((resolve, reject) => {
            // remove image from cloudinary
            let coverUrlSql = `SELECT cover_url FROM books WHERE id=$1`;
            self.pgSvc.query({ querySQL: coverUrlSql, queryArgs: [bookId] })
                .then((response) => {
                let cover_url = response.rows[0].cover_url;
                if (cover_url) {
                    self.removeImageCloudinary(cover_url);
                }
                // delete book
                let sql = `DELETE FROM books WHERE id=$1`;
                self.pgSvc.query({ querySQL: sql, queryArgs: [bookId] }).then((response) => {
                    resolve(response);
                });
            });
        });
    }
    uploadCover(coverUrl) {
        return new Promise((resolve, reject) => {
            if (!coverUrl) {
                resolve('');
            }
            else if (coverUrl.indexOf('cloudinary') > -1) {
                resolve(coverUrl);
            }
            else {
                cloudinary.uploader.upload(coverUrl, function (result) {
                    resolve(result.url);
                });
            }
        });
    }
    removeImageCloudinary(coverUrl) {
        return new Promise((resolve) => {
            if (coverUrl.indexOf('cloudinary') > -1) {
                const imageId = coverUrl.split('/').pop().split('.')[0];
                console.log(`removing image ${imageId} from cloudinary`);
                cloudinary.uploader.destroy(imageId, () => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
    updateBookInternal(bookId, queryArgs) {
        let self = this;
        queryArgs.push(bookId);
        let sql = `UPDATE books SET
                    publish_date = $1, 
                    price = $2, 
                    model = $3, 
                    name = $4, 
                    author = $5, 
                    cover_url = $6, 
                    sku = $7, 
                    last_update = $8, 
                    summary = $9
                    WHERE id = $10
                    RETURNING *;`;
        return self.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    insertBook(queryArgs) {
        let self = this;
        let sql = `INSERT INTO books(
                    publish_date, 
                    price, 
                    model, 
                    name, 
                    author, 
                    cover_url, 
                    sku, 
                    last_update, 
                    summary
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
        return self.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    searchBook(request) {
        let self = this;
        return new Promise((resolve, reject) => {
            /*
             content=$(curl https://simania.co.il/bookdetails.php\?item_id\=982626)
             echo $content > t.html
             */
            resolve(`name: ${request.body.name}, author: ${request.body.author}`);
        });
    }
    searchOnline(query) {
        return new Promise((resolve, reject) => {
            const searchString = query.name.split(' ').concat(query.author.split(' ')).join('+');
            const searchUrl = `https://simania.co.il/searchBooks.php?searchType=tabAll&query=${searchString}`;
            execFile('curl', [searchUrl], (error, stdout, stderr) => {
                if (error) {
                    return reject({ status: 500, message: error });
                }
                // case one result:
                if (stdout.length < 100) {
                    const itemId = stdout.split('item_id=').pop().split('"')[0];
                    const itemUrl = `https://simania.co.il/bookdetails.php?item_id=${itemId}`;
                    execFile('curl', [itemUrl], (error, stdout, stderr) => {
                        if (error) {
                            return reject({ status: 500, message: error });
                        }
                        const bookDOM = stdout;
                        let $ = cheerio.load(bookDOM);
                        let cover_url = '';
                        let desc = '';
                        try {
                            cover_url = 'https://simania.co.il' + $('.bookImage')[0].attribs.src;
                        }
                        finally { }
                        try {
                            desc = $('#description .description').text();
                        }
                        finally { }
                        resolve({
                            cover_url: cover_url,
                            desc: desc
                        });
                    });
                }
                else {
                    reject({ status: 404, message: 'not found' });
                }
            });
            // https://simania.co.il/searchBooks.php?searchType=tabAll&query=%D7%9E%D7%A0%D7%94%D7%A8%D7%AA+%D7%94%D7%96%D7%9E%D7%9F+%D7%92%D7%9C%D7%99%D7%9C%D7%94+%D7%A8%D7%95%D7%9F+%D7%A4%D7%93%D7%A8
        });
    }
}
exports.Books = Books;
//# sourceMappingURL=index.js.map