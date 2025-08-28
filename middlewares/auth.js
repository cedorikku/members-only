export const preventUnauthorized = (req, res, next) => {
    if (!req.user) return res.redirect('/account/login');
    next();
};

export const preventAuthenticated = (req, res, next) => {
    if (req.user) return res.redirect('/');
    next();
};

export const adminOnly = [
    preventUnauthorized,
    (req, res, next) => {
        if (req.user.role !== 'admin') return res.status(404).render('404');
        next();
    },
];
