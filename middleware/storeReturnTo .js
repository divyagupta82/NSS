const storeReturnTo = (req, res, next) => {
    // console.log(req.body);
    if (req.session && !req.session.returnTo && req.headers.referer) {
        req.session.returnTo = req.headers.referer;
    }
    next();
};

module.exports = storeReturnTo;