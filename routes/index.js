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
    console.log(user)
    user.cart.push(id);
    await user.save();
    res.redirect("/cart")
})

router.get("/cart",isLoggedIn,async(req,res)=>{
    let {email} = req.user
    let user = await userModel.findOne({email}).populate('cart')
    console.log(user)
    res.render("cart",{user})
})

router.get("/delete/:_id", isLoggedIn, async (req, res) => {
    try {
      let { _id } = req.params;
      let { email } = req.user;
  
      // Find the user by email and remove the product from their cart
      let updatedUser = await userModel.findOneAndUpdate(
        { email: email }, // Find the user by email
        { $pull: { cart: _id } }, // Use $pull to remove the product from the cart array
        { new: true } // Return the updated user document
      );
  
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
  
      // Successfully updated the cart
      res.status(200).send("Product removed from cart");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      res.status(500).send("Failed to remove product from cart");
    }
  });
  
module.exports = router;