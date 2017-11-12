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
        trim: true,
        required: [true, 'Valid email required']
    },
    password: {
        type: String,
        required: true,
        select: false
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
UserSchema.methods.authenticate = function(password) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
        
}

// hash password before saving to database
UserSchema.pre('save', function(next) {
    let user = this;
    if (user.password) { 
        bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
 
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
