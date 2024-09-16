const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const productModel= require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop",isLoggedIn, async function(req,res){
    let products = await productModel.find();

    res.render("shop",{products})
})

router.get("/show/:id",isLoggedIn,async(req,res)=>{
    let {id} = req.params
    let product = await productModel.findOne({_id:id})
    res.render("showproduct",{product})
})

router.get("/profile",isLoggedIn,async(req,res)=>{
    res.render("profile")
})

router.get("/addtocart/:id",isLoggedIn,async (req,res)=>{
    let {email} = req.user
    let {id} = req.params
    let user = await userModel.findOne({email})//populate dusre route me karo yaha nhii
    user.cart.push(id);
    await user.save();
    res.redirect("/cart")
})

router.get("/cart",isLoggedIn,async(req,res)=>{
    let {email} = req.user
    let user = await userModel.findOne({email}).populate('cart')
    res.render("cart",{user})
})

router.delete("/delete/:_id",isLoggedIn,async (req,res)=>{
    let {_id} = req.params;
    let {email} = req.user
    let user = await userModel.findOne({email})
    user.cart.forEach(element => {
        
    });
})


module.exports = router;