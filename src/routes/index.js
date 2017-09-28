// Create a router object to export to server.js
const router = require('express').Router();

// Dummy data for testing
const FILES = [
    {id: 'a', title: 'cutecat1.jpg', description: 'A cute cat'},
    {id: 'b', title: 'uglycat1.jpg', description: 'Just kidding, all cats are cute'},
    {id: 'c', title: 'total_recall_poster.jpg', description: 'Quaid, start the reactor...'},
    {id: 'd', title: 'louisville_coffee.txt', description: 'Coffee shop ratings'},
  ];


// GET all files
router.get('/file', function(req, res, next) {
    res.json(FILES);
});

// Create a new file
router.post('/file', function(req, res, next) {
    res.end('Create a new file');
});

// update an exsisting file
router.put('/file/:fileId', function(req, res, next) {
    res.end(`Updating file '${req.params.fileId}'`);
});
  
// delete an exsisting file
router.delete('/file/:fileId', function(req, res, next) {
    res.end(`Deleting file '${req.params.fileId}'`);
});

// GET a specific file
router.get('/file/:fileId', function(req, res, next) {
    const {fileId} = req.params; // same as 'const fileId = req.params.fileId'
    
    // for each entry in FILES find the first entry id that matches the value of fileID
    const file = FILES.find(entry => entry.id === fileId);
    // if file cannot be found
    if (!file) {
      return res.status(404).end(`Could not find file '${fileId}'`);
    }
  
    res.json(file);
});

module.exports = router;