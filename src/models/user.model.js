// Load mongoose package
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


mongoose.Promise = global.Promise;



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
    ],
    created_at: { 
        type: Date, default: Date.now 
    },
    deleted: {
        type: Boolean, default: false
    }
    
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
            console.log(user);
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
