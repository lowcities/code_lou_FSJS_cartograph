// Load mongoose package
const mongoose = require('mongoose');

// Layout of Grocery list
const ListSchema = new mongoose.Schema({
    itemName: String
});

const List = mongoose.model('List', ListSchema);
module.exports = List;

// Count how many lists are in the collection
List.count({}, function(err, count) {
    if (err) {
      throw err;
    } else if (count > 0) {
        return;
    }
    // ...
  });

const lists = require('./list.seed.json');
// lists.forEach(function(item, index) {
//     List.find({'itemName': item}, function(err, lists) {
//         if(!err && !lists.length) {
//             List.create(lists, function(err, newLists) {
//                 if (err) {
//                     throw err;
//                 }
//                 console.log("DB seeded");
//             });
//         }
//     });
// });
List.create(lists, function(err, newLists) {
      if (err) {
          throw err;
      }
      console.log("DB seeded");
      
  });