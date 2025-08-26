export const preventUnauthorized = (req, res, next) => {
    if (!req.user) return res.redirect('/account/login');
    next();
};

export const preventAuthenticated = (req, res, next) => {
    if (req.user) return res.redirect('/');
    next();
};
