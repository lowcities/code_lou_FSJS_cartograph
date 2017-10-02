// Create a router object to export to server.js
const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const List = require('../models/list.model');

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
    const listData = {
        itemName: req.body.itemName
    };
    console.log(listData);
    
    List.create(listData, function(err, newList) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        res.json(newList);
    });
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