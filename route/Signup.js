const express = require('express');
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUp')
const bcrypt = require('bcrypt')

const {signupValidation, loginValidation} = require('../validation')

//Signup Router
router.post('/signup', async (request, response) => {


    //validating user input
    const { error } = signupValidation(request.body);

    if(error) {
        return response.status(400).json({ error: error.details[0].message });
    }

    // check if email already exists
    const emailExists = await signUpTemplateCopy.findOne({
        email: request.body.email
    });
    if(emailExists) {
        return response.status(400).json({
            error: "Email already registered"
        });
    }

    // check if username already exists
    const userExists = await signUpTemplateCopy.findOne({
        username: request.body.username
    });
    if(userExists) {
        return response.status(400).json({
            error: "Username already exists"
        });
    }

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)
    const signedUpUser = new signUpTemplateCopy({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: securePassword
    })

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})


//Login router
router.post('/login', async (request, response) => {

    //validate user login info
    const { error } = loginValidation(request.body);

    if(error) {
        return response.status(400).json({ error: error.details[0].message });
    }

    //Error if username is wrong
    const userExists = await signUpTemplateCopy.findOne({
        username: request.body.username
    });
    if(!userExists) {
        return response.status(400).json({
            error: "Username does not exists"
        });
    }

    //checkfor password correctness
    const validPassword = await bcrypt.compare(request.body.password, userExists.password)

    if(!validPassword ) {
        return response.status(400).json({ error: "Password is wrong"});
    }

    return response.status(200).json({ ok: "Logged in Successfully"});
});

module.exports = router;