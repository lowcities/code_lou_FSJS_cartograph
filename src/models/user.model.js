// Load mongoose package
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Layout of User profile
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

// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if ( !user ) {
                let err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        })
}

// hash password before saving to database
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
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

// const users = require('./list.seed.json');
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