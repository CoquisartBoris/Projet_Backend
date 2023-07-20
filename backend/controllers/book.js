const bcrypt = require('bcrypt')
const Book = require('../models/Book')
const jwt = require('jsonwebtoken');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.book);
    delete thingObject._id;
    delete thingObject._userId;
   /* const thing = new Book({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
        ratings: [req.auth.userId, req.body.grade],
        averageRating: 0
        
    });*/
    
    const thing = new Book({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.userId
        
    });
    
    console.log(thing)
    
    thing.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };
