const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const bcrypt = require('bcrypt')

module.exports.registerUser = async function(req,res){
    try{
    let {email, password, fullname} = req.body;
    let user = await userModel.findOne({email});
    if(user){
        req.flash("error","You Already have an account , please login !")
        return res.redirect("/");
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            if(err) return res.send(err.message);
            let user = await userModel.create({
                email,
                password:hash,
                fullname,
            });
            let token = generateToken(user);
            res.cookie("token",token);
            req.flash("error","User Created Successfully !");
            return res.redirect("/");
        });
    });
    } catch(err){
        res.send(err.message);
    }
}

module.exports.loginUser = async function(req,res){
    let {email,password} = req.body;
    let user = await userModel.findOne({email}); //use findone instead of find , otherwise user.password won't work
    if(!user) {
        req.flash("error","Email or password is invalid !");
        return res.redirect("/");
    } 
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = generateToken(user)
            res.cookie("token",token)
            return res.redirect("/shop")
        }
        req.flash("error","Invalid email or password!!"); //it takes 2 inputs ,1st msg name 2nd msg itself
        return res.redirect("/");
    });
}

module.exports.logoutUser = async function(req,res){
    res.cookie("token","");
    res.redirect("/");
}

