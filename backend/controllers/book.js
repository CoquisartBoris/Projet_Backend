const bcrypt = require('bcrypt')
const Book = require('../models/Book')
const jwt = require('jsonwebtoken');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.book);
    delete thingObject._id;
    delete thingObject._userId;

    const thing = new Book({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.userId
        
    });
    
    thing.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.getBooks = (req, res, next) => {
    Book.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}