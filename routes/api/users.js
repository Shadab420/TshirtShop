const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const Role = require('../../models/Role');

//Product Model
const User = require('../../models/User');

router.get('/', (req, res)=>{
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
});

// @route GET api/users
//@desc Register new user
//@access Public
router.post('/', (req, res)=>{
    const { name, email, password, address, photo } = req.body;

    //simple validation
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all information!'});
    }

    //check if user already exists.
    User.findOne({email: email})
        .then(user => {
            if(user){
                return res.status(400).json({ msg: 'User already exists!' });
            }

            // const role = Role.find({"roleName": "customer"});
            // console.log(role.roleName);

            const newUser = new User({
                name,
                email,
                password,
                address,
                // role
            });

            //Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                               { id: user.id },
                               config.get('jwtSecret'),
                               { expiresIn: 3600 },

                               (err, token) => {
                                    if(err) throw err;

                                    res.json({
                                        
                                        token,

                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });

                               }
                            )

                            
                        });
                });
            });
        });

});

module.exports = router;