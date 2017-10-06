// Create a router object to export to server.js
const app = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');


router.get('/', function(req, res, next) {
    return res.redirect('/login');
});

// Login page for new users
router.get('/login', function(req, res, next) {
    return res.render('login');
});

// POST login info to access user profile
router.post('/login', (req, res, next) => {
    let userData = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(userData);
	if(req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, (error, user) => {
			if(error || !user) {
				let err = new Error('Wrong email or password.');
				err.status =  401;
				return next(err);
			} else {
				req.session.userId = user._id;
                return res.redirect('/profile');
            }
		});
	} else {
		let err = new Error('Email and password are required.');
		err.status = 401;
		return next(err);
	}
});

router.get('/register', function(req, res, next) {
    res.render('register');

});

router.post('/register', function(req, res, next) {
    //create object with form input
		let userData = {
			email: req.body.email,
			name: req.body.name,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };
    if (req.body.email &&
		req.body.name &&
		req.body.password &&
		req.body.confirmPassword) {

		//confirm that user typed same password twice
		if (req.body.password !== req.body.confirmPassword) {
			let err = new Error('Passwords do not match.');
			err.status = 400;
			return next(err);
		}
        //use schema's 'create' method to insert document into Mongo
		User.create(userData, (error, user) => {
			if(error) {
				return next(error);
			} else {
                req.session.userId = user._id;
                console.log(user._id);
                res.send({redirect: '/profile'});            
            }
            // res.json(newUser);
        });

		} else {
			let err = new Error('All fields required.');
			err.status = 400;
			return next(err);
		}
});

// GET user profile and list
router.get('/profile', function(req, res, next) {
    User.findById(req.session.userId)
        .exec((error, user) => {
            if (error) {
                return next(error);
            } else {
                return res.render('profile', {
                    name: user.name
                });
            }
        });
});

// GET all lists
router.get('/list', function(req, res, next) {
    List.find({}, function(err, lists) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
      
        res.json(lists);
      });
});

// Create a new list
router.post('/profile', function(req, res, next) {
    
});

// update an exsisting list
router.put('/profile', function(req, res, next) {
    // const {userId} = req.params;
    // const list = lists.find(entry => entry.id === listId);
    let listData = {
        groceryList: [{
            itemName: req.body.item
        }]
    };
   console.log(listData);
    // res.json(list);
  })
  
// delete an exsisting list
router.delete('/list/:listId', function(req, res, next) {
    res.end(`Deleting list '${req.params.listId}'`);
});

// GET a specific list
router.get('/list/:listId', function(req, res, next) {
    const {listId} = req.params; // same as 'const listId = req.params.listId'
    
    // for each entry in lists find the first entry id that matches the value of listID
    const list = lists.find(entry => entry.id === listId);
    // if list cannot be found
    if (!list) {
      return res.status(404).end(`Could not find list '${listId}'`);
    }
  
    res.json(list);
});

module.exports = router;