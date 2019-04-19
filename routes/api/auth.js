const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//Product Model
const User = require('../../models/User');
const Role = require('../../models/Role');


// @route GET api/users
//@desc Register new user
//@access Public
router.post('/', (req, res)=>{
    const { email, password } = req.body;

    //simple validation
    if(!email || !password){
        alert(Role.find({ roleName: "customer"}));
        return res.status(400).json({ msg: 'Please enter all information!'});
    }

    //check if user already exists.
    User.findOne({email: email})
        .then(user => {
            if(!user){
                return res.status(400).json({ msg: 'User does not exist!' });
            }

            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: "invalid credentials!"});

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

                })

        });

});

module.exports = router;