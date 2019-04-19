const mocha = require('mocha');
const assert = require('assert');
const Product = require('../models/Product');

describe('CRUD Test', function(){

    //Create test
    it('Add Product', (done)=>{
        newProduct = new Product({
            
                "name": "Chartres Cathedral",
                "description": "The fur Merchants. Not all the beautiful stained",
                "price": 40.50,
                "discounted_price": 30.00,
                "image1": "G:/my_projects/Web-Apps/NodeJS-dev/Tshirtshop/assets/images/products/adoration-of-the-kings.gif",
                "display": true
            
        });
        
        newProduct.save().then((result)=>{
            if(result){
                console.log(result);
            }
            else{
                console.log( "cannot save" );
            }
            
        }).finally(done);
    });

});