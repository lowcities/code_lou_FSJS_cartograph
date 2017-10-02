// Load mongoose package
const mongoose = require('mongoose');

// Layout of Grocery list
const ListSchema = new mongoose.Schema({
    name: String,
    groceryList: [
        {
            itemName: String
        }
    ]
    
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
// lists.forEach(function(name, index) {
//     List.find({'name': List.name}, function(err, lists) {
//         console.log("test");
//         console.log(name);
//         if(!err && !lists.length) {
//             List.create(lists, function(err, newList) {
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