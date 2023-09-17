const permit = (...roles)=> {
    console.log("role")
    return (req, res, next)=> {
        console.log(req);
        if (!req.user) {
            return res.status(401).send({message: 'Unauthenticated'});
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({message: 'Unauthorized'});
        }
        next();
    }
};

module.exports = permit;