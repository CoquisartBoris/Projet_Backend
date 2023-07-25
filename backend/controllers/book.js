const bcrypt = require('bcrypt')
const Book = require('../models/Book')
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.userId
        
    });

    book.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.getBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(oneBook => {
        return res.status(200).json(oneBook) 
    })
    .catch(error => res.status(400).json({ error }));
}

exports.deleteOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized !!!'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

exports.updateBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getBestBooks = (req, res, next) => {
    Book.find({}, null, {limit:3}).sort({averageRating: "desc"})
    .then(bestBooks => {
        return res.status(200).json(bestBooks)
    })
    .catch(error => {
        return res.status(400).json({ error })
    })
}
exports.rateBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => {
       if (book.ratings.indexOf(req.auth.userId) === -1) {
            book.ratings.push({userId: req.auth.userId, grade: req.body.rating})
            book.save()
            .then(book => res.status(200).json(book))
            .catch(error => { res.status(400).json( { error })})
        } else {
            return res.status(200).json(book)
        }
    })
    .catch(error => {
        return res.status(400).json({ error })
    })
}