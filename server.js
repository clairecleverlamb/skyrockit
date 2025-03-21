const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const applicationsController = require('./controllers/applications.js');


const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// passUserToView comes after session middleware but before homepage
app.use(passUserToView); 


app.get('/', (req, res) => {
  if (req.session.user){
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    res.render('index.ejs');
  }
});


// control everything that needs to be sign up and sign in 
app.use('/auth', authController);
// then I can use the isSignedIn middleware 
app.use(isSignedIn);
app.use('/users/:userId/applications', applicationsController);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
