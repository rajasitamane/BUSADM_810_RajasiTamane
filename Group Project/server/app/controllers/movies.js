'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Movie = mongoose.model('Movies'),
    multer=require('multer');
const upload=multer({dest:'uploads/'});

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 
    router.route('/movies').get((req, res, next) => {
        logger.log('info', 'Get all Movies');

        var query = Movie.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Movies" });
                }
            })
            .catch(err => {
                return next(err);
            });

    });

    router.route('/movies/user/:id').get((req, res, next) => {
        logger.log('info', 'Get all user Movies' + req.params.id);

        var query = Movie.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Movies" });
                }
            })
            .catch(err => {
                return next(err);
            });

    });

    router.route('/movies/:id').get((req, res, next) => {
        logger.log('info', 'Get Movie %s'+  req.params.id);

        Movie.findById(req.params.id)
            .then(Movies => {
                if (Movies) {
                    res.status(200).json(Movies);
                } else {
                    res.status(404).json({message: "No Movies found" });
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.route('/movies/:id').put((req, res, next) => {
        logger.log('info', 'Get Movie %s' +  req.params.id);

        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(Movie => {
                res.status(200).json(Movie);
            })
            .catch(error => {
                return next(error);
            });

    });
    router.route('/movies',upload.single('movieImage')).post((req, res, next) => {
        console.log(req.file);
        logger.log('info', 'Create Movie');
        var movie = new Movie(req.body);
        movie.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });

    });

    router.route('/movies/:id').delete((req, res, next) => {
        logger.log('info', 'Get Movie %s' +  req.params.id);

        Movie.remove({ _id: req.params.id })
            .then(Movie => {
                res.status(200).json({ msg: "Movie Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });

};




