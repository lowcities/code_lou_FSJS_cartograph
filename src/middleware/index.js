
function requiresLogin(req, res, next) {
    if(req.session && req.session.userId) {
        return next();
    } else {
        let err = new Error("You must be logged in to access that page!");
        err.status = 403;
        return next(err);
    }
}
module.exports.requiresLogin = requiresLogin;