const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    // anything we need oto access in our template Globally 
    // can be added as a property to res.locals
    // rest is short for response 
    // generateing tempelate is part of the response  
    next();
  };
  
  module.exports = passUserToView;