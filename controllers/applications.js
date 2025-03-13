// controllers/applications.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET  /users/:userId/applications
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('applications/index.ejs', {
            applicaitons: currentUser.applications
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// GET  /users/:userId/applications/new   
router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
})

// POST /USERS/:userId/applications
router.post('/', async (req, res) =>{
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body);  //only save in the memory 
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;
