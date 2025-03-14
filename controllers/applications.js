// controllers/applications.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET  /users/:userId/applications
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('applications/index.ejs', {
            applications: currentUser.applications
        });
        // pass the current user's applications to the index page
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

// GET /users/:userId/applications/:applicationId
router.get('/:applicationId', async (req, res) => {
    try {
        // look up the user that's currently logged in
        const currentUser = await User.findById(req.session.user._id);
        // find the sub-document in the currently logged in user's applications list
        const application = currentUser.applications.id(req.params.applicationId);
        // render a show template with the sud-document's details
        res.render('applications/show.ejs', {
            application 
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// users/:userId/applications/:applicationId
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        // user mongoose .deleteOne()
        currentUser.applications.id(req.params.applicationId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;
