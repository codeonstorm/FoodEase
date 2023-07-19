const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const { HTTP_BAD_REQUEST } = require('../constant/http_status');


const router = express.Router();

router.get('/seed', async function (req, res) {
    const foodCount = await UserModel.countDocuments();
    if(foodCount > 0){
        res.send('seed is already done');
        return;
    }
    await UserModel.create(sample_users);
    res.send('Seed done!');
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const user = await UserModel.findOne({email, password});

    if (user) {
        res.send(genertateTokenResponse(user));
    }
    else {
    res.status(400).send("User and Password not found");
    }
})



router.post('/register', async (req, res) => {

    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({email});

    if(user){
        res.status(HTTP_BAD_REQUEST).send('User is already exists, Please login!');
        return;
    }

    
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);


    if (user) {
        res.send(genertateTokenResponse(user));
    }
    else {
    res.status(400).send("User and Password not found");
    }
})


// generate token

const genertateTokenResponse = (user) => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }, "somerandomtext", {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}



module.exports = router;


