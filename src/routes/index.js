// Create a router object to export to server.js
const app = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');




// Login page for new users
router.get('/login', function(req, res, next) {
    return res.redirect('/register');
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

       console.log(req.body);
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
                // req.session.userId = user._id;
                
                req.session.userId = user._id;
                console.log(user._id);
                res.send({redirect: '/profile'});            }
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
router.post('/list', function(req, res, next) {
    // res.render('/list');
    const listData = {
        name: req.body.name
    };

    if (req.body.name) {
        List.create(listData, function(err, newList) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            res.json(newList);
        });
    } else {
        let err = new Error('Name field required');
        err.status = 400;
        return next(err);
    }
    
    
    
  });

// update an exsisting list
router.put('/list/:listId', function(req, res, next) {
    const {listId} = req.params;
    const list = lists.find(entry => entry.id === listId);
    if (!list) {
      return res.status(404).end(`Could not find list '${listId}'`);
    }
  
    list.title = req.body.title;
    list.description = req.body.description;
    res.json(list);
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