// Load mongoose package
const mongoose = require('mongoose');

// Layout of Grocery list
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    groceryList: [
        {
            itemName: String
        }
    ]
    
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// Count how many lists are in the collection
User.count({}, function(err, count) {
    if (err) {
      throw err;
    } else if (count > 0) {
        return;
    }
    // ...
  });

const users = require('./list.seed.json');
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
// List.create(lists, function(err, newLists) {
//       if (err) {
//           throw err;
//       }
//       console.log("DB seeded");
      
//   });