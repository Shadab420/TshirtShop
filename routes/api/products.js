const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/auth');

//Product Model
const Product = require('../../models/Product');

// @route GET api/products
//@desc Get All Products
//@access Public
router.get('/', (req, res)=>{
    Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
});

// @route POST api/products
//@desc Add a product
//@access Public
router.post('/', auth, (req, res)=>{


    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discounted_price: req.body.discounted_price,
        image1: req.body.image1,
        image2: req.body.image2,
        display: req.body.display
    });

    newProduct.save().then(item => res.json(item));
});


// router.delete('/delete/:id',auth, (req,res)=>{


//        Product.findByIdAndRemove({ _id: req.params.id }, (err)=>{

//             if(err){

//                 console.log(err);
//                 return res.status(500).send();
//             }

//             res.status(200).send();

//        })
    
// })

router.delete('/:id', (req, res, next)=>{
    Proudct.deleteOne( { "_id": req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


module.exports = router;